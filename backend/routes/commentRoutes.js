const express = require('express');
const router = express.Router();
const {
    createComment,
    getCommentsByBlogId,
    getAllComments,
    updateComment,
    deleteComment,
    likeComment,
} = require('../controllers/commentController');
const protect = require('../middleware/auth');

// Create a new comment
router.post('/', createComment);

// Get comments for a specific blog post
router.get('/blog/:blogId', getCommentsByBlogId);

// Get all comments (admin only)
router.get('/', getAllComments);

// Update a comment
router.put('/:id', protect, updateComment);

// Delete a comment
router.delete('/:id', protect, deleteComment);

// Like a comment
router.post('/:id/like', protect, likeComment);

module.exports = router;
