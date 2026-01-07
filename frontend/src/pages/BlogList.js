import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllBlogs } from '../services/blogService';
import '../styles/BlogList.css';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState('createdAt');
    const [order, setOrder] = useState('desc');

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                setLoading(true);
                const data = await fetchAllBlogs(category, sortBy, order);
                setBlogs(data);
                setError(null);
            } catch (err) {
                setError('Failed to load blogs. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadBlogs();
    }, [category, sortBy, order]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (loading) {
        return <div className="loading">Loading blogs...</div>;
    }

    return (
        <div className="blog-list-container">
            <div className="filter-section">
                <div className="filter-group">
                    <label htmlFor="category">Category:</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        <option value="Technology">Technology</option>
                        <option value="Travel">Travel</option>
                        <option value="Food">Food</option>
                        <option value="Lifestyle">Lifestyle</option>
                        <option value="Mindfulness">Mindfulness</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="sortBy">Sort By:</label>
                    <select
                        id="sortBy"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="createdAt">Date Created</option>
                        <option value="title">Title</option>
                        <option value="author">Author</option>
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

            {error && <div className="error-message">{error}</div>}

            {blogs.length === 0 ? (
                <div className="no-blogs">
                    <p>No blog posts found. Start by creating one!</p>
                    <Link to="/create" className="btn btn-primary">
                        Create First Post
                    </Link>
                </div>
            ) : (
                <div className="blogs-grid">
                    {blogs.map((blog) => (
                        <article key={blog._id} className="blog-card">
                            <div className="blog-card-header">
                                <h2>{blog.title}</h2>
                                <span className="category-badge">{blog.category}</span>
                            </div>
                            <p className="blog-description">
                                {blog.description || blog.content.substring(0, 150)}...
                            </p>
                            <div className="blog-meta">
                                <span className="author">By {blog.author}</span>
                                <span className="date">{formatDate(blog.createdAt)}</span>
                            </div>
                            <div className="blog-actions">
                                <Link to={`/blog/${blog._id}`} className="btn btn-secondary">
                                    Read More
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BlogList;
