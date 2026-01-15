import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchBlogById, deleteBlog, likeBlog, shareBlog } from '../services/blogService';
import Loader from '../components/Loader';
import AuthContext from '../context/AuthContext';
import '../styles/BlogDetail.css';

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [liking, setLiking] = useState(false);
    const [sharing, setSharing] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const loadBlog = async () => {
            try {
                setLoading(true);
                const data = await fetchBlogById(id);
                setBlog(data);
                setError(null);
            } catch (err) {
                setError('Easy Your Mind us we try to fetch your blog post. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadBlog();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            try {
                setDeleting(true);
                await deleteBlog(id);
                navigate('/');
            } catch (err) {
                setError('Failed to delete blog post.');
                console.error(err);
            } finally {
                setDeleting(false);
            }
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (loading) {
        return <Loader type="spinner" />;
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="error-message">{error}</div>
                <Link to="/" className="btn btn-primary">
                    Back to Blogs
                </Link>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="error-container">
                <div className="error-message">Blog post not found.</div>
                <Link to="/" className="btn btn-primary">
                    Back to Blogs
                </Link>
            </div>
        );
    }

    return (
        <div className="blog-detail-container">
            <Link to="/" className="back-link">
                ← Back to Blogs
            </Link>

            <article className="blog-detail">
                <header className="blog-header">
                    <h1>{blog.title}</h1>
                    <span className="category-badge">{blog.category}</span>
                </header>

                <div className="post-stats">
                    <span className="stat">👁️ {blog.views || 0}</span>
                    <span className="stat">👍 {blog.likes ? blog.likes.length : 0}</span>
                    <span className="stat">💬 {blog.comments ? blog.comments.length : 0}</span>
                    <span className="stat">🔗 {blog.shares || 0}</span>
                </div>

                <div className="blog-meta-info">
                    <div className="meta-item">
                        <strong>Author:</strong> {blog.author}
                    </div>
                    <div className="meta-item">
                        <strong>Published:</strong> {formatDate(blog.createdAt)}
                    </div>
                    {blog.updatedAt !== blog.createdAt && (
                        <div className="meta-item">
                            <strong>Last Updated:</strong> {formatDate(blog.updatedAt)}
                        </div>
                    )}
                </div>

                <div className="blog-content">
                    {blog.content.split('\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>

                <div className="blog-actions">
                    <button
                        className={`btn ${blog.likes && user && blog.likes.includes(user._id) ? 'btn-edit' : 'btn-secondary'}`}
                        onClick={async () => {
                            if (!user) return navigate('/login');
                            try {
                                setLiking(true);
                                const updated = await likeBlog(id);
                                setBlog(updated);
                            } catch (err) {
                                console.error(err);
                            } finally {
                                setLiking(false);
                            }
                        }}
                        disabled={liking}
                    >
                        {liking ? '...' : '👍 Like'}
                    </button>

                    <button
                        className="btn btn-secondary"
                        onClick={async () => {
                            try {
                                setSharing(true);
                                // attempt native share
                                if (navigator.share) {
                                    await navigator.share({
                                        title: blog.title,
                                        text: blog.description || blog.title,
                                        url: window.location.href,
                                    });
                                } else {
                                    // copy link to clipboard
                                    await navigator.clipboard.writeText(window.location.href);
                                    alert('Link copied to clipboard');
                                }
                                const updated = await shareBlog(id);
                                setBlog(updated);
                            } catch (err) {
                                console.error(err);
                            } finally {
                                setSharing(false);
                            }
                        }}
                        disabled={sharing}
                    >
                        {sharing ? 'Sharing...' : '🔗 Share'}
                    </button>

                    <Link to={`/edit/${blog._id}`} className="btn btn-primary">
                        Edit Post
                    </Link>

                    <button
                        className="btn btn-danger"
                        onClick={handleDelete}
                        disabled={deleting}
                    >
                        {deleting ? 'Deleting...' : 'Delete Post'}
                    </button>
                </div>
            </article>
        </div>
    );
};

export default BlogDetail;
