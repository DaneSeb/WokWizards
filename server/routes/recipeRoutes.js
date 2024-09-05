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
router.get('/submit-recipe', isLoggedIn, recipeController.submitRecipe);
router.post('/submit-recipe', isLoggedIn, recipeController.submitRecipeOnPost);
router.get('/recipe/:id/edit', isLoggedIn, recipeController.editRecipe);
router.put('/recipe/:id/edit', isLoggedIn, recipeController.updateRecipe);

module.exports = router;