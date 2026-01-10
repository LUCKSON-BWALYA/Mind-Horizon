import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchAllBlogs, deleteBlog } from '../services/blogService';
import AuthContext from '../context/AuthContext';
import Loader from '../components/Loader';
import '../styles/MyPosts.css';

const MyPosts = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('createdAt');
    const [order, setOrder] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [deleting, setDeleting] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const loadBlogs = async () => {
            try {
                setLoading(true);
                const data = await fetchAllBlogs('', sortBy, order);
                // Filter only current user's posts
                const userBlogs = data.filter(blog => blog.author === user.name);
                setBlogs(userBlogs);
                setError(null);
            } catch (err) {
                setError('Failed to load your posts. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadBlogs();
    }, [user, sortBy, order, navigate]);

    // Filter blogs based on search term
    useEffect(() => {
        const filtered = blogs.filter(blog => {
            const searchLower = searchTerm.toLowerCase();
            return (
                blog.title.toLowerCase().includes(searchLower) ||
                (blog.description && blog.description.toLowerCase().includes(searchLower)) ||
                blog.content.toLowerCase().includes(searchLower)
            );
        });
        setFilteredBlogs(filtered);
        setCurrentPage(1);
    }, [searchTerm, blogs]);

    // Pagination calculation
    const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + itemsPerPage);

    const handleDelete = async (blogId) => {
        if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
            try {
                setDeleting(blogId);
                await deleteBlog(blogId);
                setBlogs(blogs.filter(blog => blog._id !== blogId));
                setError(null);
            } catch (err) {
                setError('Failed to delete post. Please try again.');
                console.error(err);
            } finally {
                setDeleting(null);
            }
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    if (loading) {
        return <Loader type="spinner" />;
    }

    return (
        <div className="my-posts-container">
            <div className="my-posts-header">
                <h1>My Blog Posts</h1>
                <Link to="/create" className="btn btn-primary">
                    ✏️ Create New Post
                </Link>
            </div>

            <div className="filter-section">
                <div className="search-group">
                    <input
                        type="text"
                        placeholder="Search your posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="filter-controls">
                    <div className="filter-group">
                        <label htmlFor="sortBy">Sort By:</label>
                        <select
                            id="sortBy"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="createdAt">Date Created</option>
                            <option value="title">Title</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="order">Order:</label>
                        <select
                            id="order"
                            value={order}
                            onChange={(e) => setOrder(e.target.value)}
                        >
                            <option value="desc">Newest First</option>
                            <option value="asc">Oldest First</option>
                        </select>
                    </div>
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            {filteredBlogs.length === 0 ? (
                <div className="no-posts">
                    <div className="no-posts-icon">📝</div>
                    <p>{searchTerm ? 'No posts match your search.' : 'You haven\'t created any posts yet.'}</p>
                    <Link to="/create" className="btn btn-primary">
                        Create Your First Post
                    </Link>
                </div>
            ) : (
                <>
                    <div className="posts-info">
                        <p>Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredBlogs.length)} of {filteredBlogs.length} posts</p>
                    </div>
                    <div className="posts-grid">
                        {paginatedBlogs.map((blog) => (
                            <div key={blog._id} className="post-card">
                                <div className="post-card-header">
                                    <h2>{blog.title}</h2>
                                    <span className="category-badge">{blog.category}</span>
                                </div>
                                <p className="post-description">
                                    {blog.description || blog.content.substring(0, 120)}...
                                </p>
                                <div className="post-meta">
                                    <span className="date">{formatDate(blog.createdAt)}</span>
                                </div>
                                <div className="post-actions">
                                    <Link to={`/blog/${blog._id}`} className="btn btn-secondary">
                                        View
                                    </Link>
                                    <Link to={`/edit/${blog._id}`} className="btn btn-edit">
                                        Edit
                                    </Link>
                                    <button
                                        className="btn btn-delete"
                                        onClick={() => handleDelete(blog._id)}
                                        disabled={deleting === blog._id}
                                    >
                                        {deleting === blog._id ? 'Deleting...' : 'Delete'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                className="pagination-btn"
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                ← Previous
                            </button>
                            <div className="page-numbers">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }
                                    return (
                                        <button
                                            key={pageNum}
                                            className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                                            onClick={() => setCurrentPage(pageNum)}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>
                            <button
                                className="pagination-btn"
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default MyPosts;
