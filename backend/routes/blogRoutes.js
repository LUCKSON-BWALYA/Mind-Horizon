const express = require('express');
const router = express.Router();
const {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
} = require('../controllers/blogController');

// Create a new blog post
router.post('/', createBlog);

// Get all blog posts
router.get('/', getAllBlogs);

// Get a single blog post by ID
router.get('/:id', getBlogById);

// Update a blog post
router.put('/:id', updateBlog);

// Delete a blog post
router.delete('/:id', deleteBlog);

module.exports = router;
