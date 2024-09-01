const mongoose = require('mongoose');

// parsing options for schema
const recipeSchema = new mongoose.Schema({
    author : {
        type: String,
        required:'This field id required!'
    },
    name : {
        type: String,
        required: 'This field is required!'
    },
    description : {
        type: String,
        required: 'This field is required!'
    },
    email : {
        type: String,
        required: 'This field is required!'
    },
    ingredients : {
        type: Array,
        required: 'This field is required!'
    },
    category : {
        type: String,
        enum: ['Thai', 'American', 'Chinese', 'Mexican', 'Indian'],
        required: 'This field is required!'
    },
    diets: {
        type: [String],
        enum: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free'],
        required: 'This field is required!'
    },
    duration: {
        type: Number,
        required: 'This field is required'
    },
    persons: {
        type: Number,
        required: 'This field is required'
    },
    image : {
        type: String,
        required: 'This field is required!'
    },
    // Nutritional Information
    calories: {
        type: Number,
        set: value => Math.round(value * 10) / 10 // Ensures a single decimal place
    },
    fats: {
        type: Number,
        set: value => Math.round(value * 10) / 10
    },
    carbohydrates: {
        type: Number,
        set: value => Math.round(value * 10) / 10 
    },
    protein: {
        type: Number,
        set: value => Math.round(value * 10) / 10
    },
    sugar: {
        type: Number,
        set: value => Math.round(value * 10) / 10
    },
    salt: {
        type: Number,
        set: value => Math.round(value * 10) / 10
    },
    saturates: {
        type: Number,
        set: value => Math.round(value * 10) / 10
    },
    fibre: {
        type: Number,
        set: value => Math.round(value * 10) / 10
    }
    
});

recipeSchema.index({ name: 'text', description: 'text' }); //Passing recipe schema here
// Magic Indexing 
// recipeSchema.index({ "$**": 'text' });

module.exports = mongoose.model('Recipe', recipeSchema);