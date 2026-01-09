import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createBlog, updateBlog, fetchBlogById } from '../services/blogService';
import Loader from '../components/Loader';
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
        featuredImage: null,
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isLoadingBlog, setIsLoadingBlog] = useState(isEditMode);

    // Quill modules configuration
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['blockquote', 'code-block'],
            [{ 'color': [] }, { 'background': [] }],
            ['link', 'image', 'video'],
            ['clean'],
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet', 'indent',
        'blockquote', 'code-block',
        'color', 'background',
        'link', 'image', 'video',
    ];

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
                        featuredImage: null,
                    });
                    if (blog.featuredImage) {
                        setImagePreview(blog.featuredImage);
                    }
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

    const handleContentChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            content: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('Image size must be less than 5MB');
                return;
            }

            // Validate file type
            if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
                setError('Only JPEG, PNG, GIF, and WebP images are allowed');
                return;
            }

            setFormData((prev) => ({
                ...prev,
                featuredImage: file,
            }));

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (!formData.title.trim()) {
            setError('Title is required');
            return;
        }
        if (!formData.content || formData.content.trim().length < 10) {
            setError('Content must be at least 10 characters');
            return;
        }
        if (!formData.author.trim()) {
            setError('Author name is required');
            return;
        }

        try {
            setLoading(true);
            const dataToSend = new FormData();
            dataToSend.append('title', formData.title);
            dataToSend.append('content', formData.content);
            dataToSend.append('author', formData.author);
            dataToSend.append('description', formData.description);
            dataToSend.append('category', formData.category);
            if (formData.featuredImage) {
                dataToSend.append('featuredImage', formData.featuredImage);
            }

            if (isEditMode) {
                await updateBlog(id, dataToSend);
                navigate(`/blog/${id}`);
            } else {
                const newBlog = await createBlog(dataToSend);
                navigate(`/blog/${newBlog._id}`);
            }
        } catch (err) {
            setError(err.message || 'Failed to save blog post.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader type="words" />;
    }

    if (isLoadingBlog) {
        return <Loader type="spinner" />;
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
                        <option value="Mindfulness">Mindfulness</option>
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
                    <label htmlFor="featuredImage">Featured Image</label>
                    <div className="image-upload-wrapper">
                        <input
                            type="file"
                            id="featuredImage"
                            name="featuredImage"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="file-input"
                        />
                        <label htmlFor="featuredImage" className="file-label">
                            <span className="upload-icon">📷</span>
                            <span className="upload-text">Click to upload image (Max 5MB)</span>
                        </label>
                    </div>
                    {imagePreview && (
                        <div className="image-preview">
                            <img src={imagePreview} alt="Preview" />
                            <button
                                type="button"
                                className="btn-remove-image"
                                onClick={() => {
                                    setFormData((prev) => ({ ...prev, featuredImage: null }));
                                    setImagePreview(null);
                                }}
                            >
                                Remove Image
                            </button>
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="content">Content * (Rich Text)</label>
                    <ReactQuill
                        value={formData.content}
                        onChange={handleContentChange}
                        modules={modules}
                        formats={formats}
                        className="quill-editor"
                        placeholder="Write your blog post content here..."
                        theme="snow"
                    />
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
