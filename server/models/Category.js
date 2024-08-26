const mongoose = require('mongoose');

// parsing options for schema
const categorySchema = new mongoose.Schema({
    name : {
        type: String,
        required: 'This field is required!'
    },
    image : {
        type: String,
        requireed: 'This field is required!'
    }
});

module.exports = mongoose.model('Category', categorySchema);