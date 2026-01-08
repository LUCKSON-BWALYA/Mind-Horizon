const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, 'Comment content is required'],
            minlength: [1, 'Comment cannot be empty'],
            maxlength: [1000, 'Comment cannot exceed 1000 characters'],
            trim: true,
        },
        author: {
            type: String,
            required: [true, 'Author name is required'],
            trim: true,
            maxlength: [100, 'Author name cannot exceed 100 characters'],
        },
        authorRef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        blog: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog',
            required: [true, 'Blog reference is required'],
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        isApproved: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Comment', commentSchema);
