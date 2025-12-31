import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { createBlog, updateBlog, fetchBlogById } from '../services/blogService';
import '../styles/BlogForm.css';

const BlogForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author: '',
        description: '',
        category: 'Other',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isLoadingBlog, setIsLoadingBlog] = useState(isEditMode);

    useEffect(() => {
        if (isEditMode) {
            const loadBlog = async () => {
                try {
                    const blog = await fetchBlogById(id);
                    setFormData({
                        title: blog.title,
                        content: blog.content,
                        author: blog.author,
                        description: blog.description || '',
                        category: blog.category,
                    });
                    setError(null);
                } catch (err) {
                    setError('Failed to load blog post.');
                    console.error(err);
                } finally {
                    setIsLoadingBlog(false);
                }
            };
            loadBlog();
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (!formData.title.trim()) {
            setError('Title is required');
            return;
        }
        if (!formData.content.trim()) {
            setError('Content is required');
            return;
        }
        if (!formData.author.trim()) {
            setError('Author name is required');
            return;
        }
        if (formData.content.trim().length < 10) {
            setError('Content must be at least 10 characters');
            return;
        }

        try {
            setLoading(true);
            if (isEditMode) {
                await updateBlog(id, formData);
                navigate(`/blog/${id}`);
            } else {
                const newBlog = await createBlog(formData);
                navigate(`/blog/${newBlog._id}`);
            }
        } catch (err) {
            setError(err.message || 'Failed to save blog post.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (isLoadingBlog) {
        return <div className="loading">Loading blog post...</div>;
    }

    return (
        <div className="blog-form-container">
            <div className="form-header">
                <h1>{isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}</h1>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="blog-form">
                <div className="form-group">
                    <label htmlFor="title">Title *</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter blog post title"
                        maxLength="200"
                        required
                    />
                    <span className="char-count">
                        {formData.title.length}/200
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="author">Author *</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        placeholder="Enter author name"
                        maxLength="100"
                        required
                    />
                    <span className="char-count">
                        {formData.author.length}/100
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="Technology">Technology</option>
                        <option value="Travel">Travel</option>
                        <option value="Food">Food</option>
                        <option value="Lifestyle">Lifestyle</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Brief description of the blog post (optional)"
                        maxLength="300"
                    />
                    <span className="char-count">
                        {formData.description.length}/300
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="content">Content *</label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="Write your blog post content here..."
                        rows="15"
                        required
                    />
                    <span className="char-count">
                        {formData.content.length} characters
                    </span>
                </div>

                <div className="form-actions">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : isEditMode ? 'Update Post' : 'Publish Post'}
                    </button>
                    <Link to="/" className="btn btn-secondary">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default BlogForm;
