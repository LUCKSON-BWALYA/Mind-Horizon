const Blog = require('../models/Blog');
const fs = require('fs');
const path = require('path');

// Create a new blog post
exports.createBlog = async (req, res, next) => {
    try {
        const { title, content, author, description, category } = req.body;

        // Validation
        if (!title || !content || !author) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({
                success: false,
                error: 'Title, content, and author are required',
            });
        }

        const blogData = {
            title,
            content,
            author,
            description,
            category,
        };

        // Add featured image if uploaded
        if (req.file) {
            blogData.featuredImage = `/uploads/${req.file.filename}`;
        }

        const blog = await Blog.create(blogData);

        res.status(201).json({
            success: true,
            data: blog,
        });
    } catch (error) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        next(error);
    }
};

// Get all blog posts
exports.getAllBlogs = async (req, res, next) => {
    try {
        const { category, sortBy = 'createdAt', order = 'desc' } = req.query;

        let query = Blog.find();

        // Filter by category if provided
        if (category) {
            query = query.where('category').equals(category);
        }

        // Sort the results
        const sortOrder = order === 'asc' ? 1 : -1;
        query = query.sort({ [sortBy]: sortOrder });

        const blogs = await query.exec();

        res.status(200).json({
            success: true,
            count: blogs.length,
            data: blogs,
        });
    } catch (error) {
        next(error);
    }
};

// Get a single blog post by ID
exports.getBlogById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const blog = await Blog.findByIdAndUpdate(
            id,
            { $inc: { views: 1 } },
            { new: true }
        ).populate('comments');

        if (!blog) {
            return res.status(404).json({
                success: false,
                error: 'Blog post not found',
            });
        }

        res.status(200).json({
            success: true,
            data: blog,
        });
    } catch (error) {
        next(error);
    }
};

// Update a blog post
exports.updateBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, content, author, description, category } = req.body;

        // Validation
        if (!title || !content || !author) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({
                success: false,
                error: 'Title, content, and author are required',
            });
        }

        let blog = await Blog.findById(id);

        if (!blog) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(404).json({
                success: false,
                error: 'Blog post not found',
            });
        }

        const updateData = { title, content, author, description, category };

        // Handle new image upload
        if (req.file) {
            // Delete old image if exists
            if (blog.featuredImage) {
                const oldImagePath = path.join(__dirname, '..', blog.featuredImage);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            updateData.featuredImage = `/uploads/${req.file.filename}`;
        }

        blog = await Blog.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: blog,
        });
    } catch (error) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        next(error);
    }
};

// Delete a blog post
exports.deleteBlog = async (req, res, next) => {
    try {
        const { id } = req.params;

        const blog = await Blog.findByIdAndDelete(id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                error: 'Blog post not found',
            });
        }

        // Delete featured image if exists
        if (blog.featuredImage) {
            const imagePath = path.join(__dirname, '..', blog.featuredImage);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        res.status(200).json({
            success: true,
            message: 'Blog post deleted successfully',
            data: blog,
        });
    } catch (error) {
        next(error);
    }
};
