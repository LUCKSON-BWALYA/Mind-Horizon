const Comment = require('../models/Comment');
const Blog = require('../models/Blog');

// Create a new comment
exports.createComment = async (req, res, next) => {
    try {
        const { content, author, blog } = req.body;

        // Validation
        if (!content || !author || !blog) {
            return res.status(400).json({
                success: false,
                error: 'Content, author, and blog ID are required',
            });
        }

        // Check if blog exists
        const blogExists = await Blog.findById(blog);
        if (!blogExists) {
            return res.status(404).json({
                success: false,
                error: 'Blog post not found',
            });
        }

        const comment = await Comment.create({
            content,
            author,
            blog,
            authorRef: req.user ? req.user._id : undefined,
        });

        // Add comment to blog
        blogExists.comments.push(comment._id);
        await blogExists.save();

        res.status(201).json({
            success: true,
            data: comment,
        });
    } catch (error) {
        next(error);
    }
};

// Get comments for a blog post
exports.getCommentsByBlogId = async (req, res, next) => {
    try {
        const { blogId } = req.params;

        const comments = await Comment.find({ blog: blogId, isApproved: true })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: comments.length,
            data: comments,
        });
    } catch (error) {
        next(error);
    }
};

// Get all comments (admin only)
exports.getAllComments = async (req, res, next) => {
    try {
        const comments = await Comment.find()
            .populate('blog', 'title')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: comments.length,
            data: comments,
        });
    } catch (error) {
        next(error);
    }
};

// Update a comment
exports.updateComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({
                success: false,
                error: 'Content is required',
            });
        }

        let comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                error: 'Comment not found',
            });
        }

        comment = await Comment.findByIdAndUpdate(
            id,
            { content },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: comment,
        });
    } catch (error) {
        next(error);
    }
};

// Delete a comment
exports.deleteComment = async (req, res, next) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findByIdAndDelete(id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                error: 'Comment not found',
            });
        }

        // Remove comment from blog
        await Blog.findByIdAndUpdate(comment.blog, {
            $pull: { comments: id },
        });

        res.status(200).json({
            success: true,
            message: 'Comment deleted successfully',
            data: comment,
        });
    } catch (error) {
        next(error);
    }
};

// Like a comment
exports.likeComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user?._id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                error: 'Must be logged in to like comments',
            });
        }

        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                error: 'Comment not found',
            });
        }

        // Check if already liked
        if (comment.likes.includes(userId)) {
            // Remove like
            comment.likes = comment.likes.filter(id => !id.equals(userId));
        } else {
            // Add like
            comment.likes.push(userId);
        }

        await comment.save();

        res.status(200).json({
            success: true,
            data: comment,
        });
    } catch (error) {
        next(error);
    }
};
