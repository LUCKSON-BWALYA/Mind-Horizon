const express = require('express');
const router = express.Router();
const {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
} = require('../controllers/blogController');
const { likeBlog, shareBlog } = require('../controllers/blogController');
const protect = require('../middleware/auth');
const upload = require('../middleware/fileUpload');

// Create a new blog post (protected, with image upload)
router.post('/', protect, upload.single('featuredImage'), createBlog);

// Get all blog posts
router.get('/', getAllBlogs);

// Get a single blog post by ID
router.get('/:id', getBlogById);

// Like a blog post (toggle)
router.post('/:id/like', protect, likeBlog);

// Share a blog post (increments share count)
router.post('/:id/share', shareBlog);

// Update a blog post (protected, with image upload)
router.put('/:id', protect, upload.single('featuredImage'), updateBlog);

// Delete a blog post (protected)
router.delete('/:id', protect, deleteBlog);

module.exports = router;
