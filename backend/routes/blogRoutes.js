const express = require('express');
const router = express.Router();
const {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
} = require('../controllers/blogController');
const { protect } = require('../middleware/auth');

// Create a new blog post (protected)
router.post('/', protect, createBlog);

// Get all blog posts
router.get('/', getAllBlogs);

// Get a single blog post by ID
router.get('/:id', getBlogById);

// Update a blog post (protected)
router.put('/:id', protect, updateBlog);

// Delete a blog post (protected)
router.delete('/:id', protect, deleteBlog);

module.exports = router;
