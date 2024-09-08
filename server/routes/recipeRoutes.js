const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const { isLoggedIn } = require('../../index');
/**
 * App Routes
 */
router.get('/',recipeController.homepage);
router.get('/categories',recipeController.exploreCategories);
router.get('/recipe/:id', recipeController.exploreRecipe);
router.get('/categories/:id',recipeController.exploreCategoriesById);
router.post('/search',recipeController.searchRecipe);
router.get('/explore-latest',recipeController.exploreLatest);
router.get('/explore-random',recipeController.exploreRandom);
router.get('/author/:email', recipeController.getAuthorRecipes);

// Middleware to protect submit-recipe routes & edit-recipe routes
// Route to submit recipes
router.get('/submit-recipe', isLoggedIn, recipeController.submitRecipe);
router.post('/submit-recipe', isLoggedIn, recipeController.submitRecipeOnPost);
// Route to edit recipes
router.get('/recipe/:id/edit', isLoggedIn, recipeController.editRecipe);
router.put('/recipe/:id/edit', isLoggedIn, recipeController.updateRecipe);
// Route to delete a recipe
router.delete('/recipe/:id', isLoggedIn, recipeController.deleteRecipe);
// Route to comment on a recipe
router.post('/recipe/:id/comment', isLoggedIn, recipeController.submitComment);
// Route for all comments by user
router.get('/user/comments', isLoggedIn, recipeController.userComments);
// Route to delete comments by user
router.post('/user/comments/:id/delete', isLoggedIn, recipeController.deleteComment);
// Route to edit comments by user
router.get('/user/comments/:id/edit', isLoggedIn, recipeController.editComment);
router.post('/user/comments/:id/edit', isLoggedIn, recipeController.editCommentOnPost);
module.exports = router;