const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required',
    },
    email: {
        type: String,
        required: 'Email is required',
    },
    comment: {
        type: String,
        required: 'Comment is required',
    },
    rating: {
        type: Number,
        required: 'Rating is required',
        min: 1,
        max: 5,  // Assuming ratings are between 1 and 5 stars
    },
    recipeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
