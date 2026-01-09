import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllBlogs } from '../services/blogService';
import Loader from '../components/Loader';
import '../styles/BlogList.css';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState('createdAt');
    const [order, setOrder] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [filteredBlogs, setFilteredBlogs] = useState([]);

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

    // Filter blogs based on search term
    useEffect(() => {
        const filtered = blogs.filter(blog => {
            const searchLower = searchTerm.toLowerCase();
            return (
                blog.title.toLowerCase().includes(searchLower) ||
                (blog.description && blog.description.toLowerCase().includes(searchLower)) ||
                blog.content.toLowerCase().includes(searchLower) ||
                (blog.author && blog.author.toLowerCase().includes(searchLower))
            );
        });
        setFilteredBlogs(filtered);
        setCurrentPage(1);
    }, [searchTerm, blogs]);

    // Pagination calculation
    const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + itemsPerPage);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (loading) {
        return <Loader type="spinner" />;
    }

    return (
        <div className="blog-list-container">
            <div className="filter-section">
                <div className="search-group">
                    <input
                        type="text"
                        placeholder="Search blogs by title, content, or author..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="filter-controls">
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
            </div>

            {error && <div className="error-message">{error}</div>}

            {filteredBlogs.length === 0 ? (
                <div className="no-blogs">
                    <p>{searchTerm ? 'No blogs match your search.' : 'No blog posts found. Start by creating one!'}</p>
                    <Link to="/create" className="btn btn-primary">
                        Create First Post
                    </Link>
                </div>
            ) : (
                <>
                    <div className="blogs-info">
                        <p>Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredBlogs.length)} of {filteredBlogs.length} posts</p>
                    </div>
                    <div className="blogs-grid">
                        {paginatedBlogs.map((blog) => (
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

export default BlogList;
