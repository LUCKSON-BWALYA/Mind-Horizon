const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Blog title is required'],
            trim: true,
            maxlength: [200, 'Title cannot exceed 200 characters'],
        },
        content: {
            type: String,
            required: [true, 'Blog content is required'],
            minlength: [10, 'Content must be at least 10 characters'],
        },
        author: {
            type: String,
            required: [true, 'Author name is required'],
            trim: true,
            maxlength: [100, 'Author name cannot exceed 100 characters'],
        },
        description: {
            type: String,
            maxlength: [300, 'Description cannot exceed 300 characters'],
        },
        category: {
            type: String,
            enum: ['Technology', 'Travel', 'Food', 'Lifestyle', 'Mindfulness', 'Other'],
            default: 'Other',
        },
        tags: {
            type: [String],
            default: [],
        },
        featuredImage: {
            type: String,
            default: null,
        },
        images: {
            type: [String],
            default: [],
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        views: {
            type: Number,
            default: 0,
        },
        shares: {
            type: Number,
            default: 0,
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment',
            },
        ],
        authorRef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Blog', blogSchema);
