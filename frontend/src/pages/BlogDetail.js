import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchBlogById, deleteBlog } from '../services/blogService';
import '../styles/BlogDetail.css';

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleting, setDeleting] = useState(false);

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
        return <div className="loading">Loading blog post...</div>;
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
