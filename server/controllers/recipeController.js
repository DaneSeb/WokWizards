require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');
const Comment = require('../models/Comment');
/**
 * GET /
 * Homepage
 */

exports.homepage = async(req,res) => {
    try {
        // database query to get categories
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
        const thai = await Recipe.find({'category': 'Thai'}).limit(limitNumber);
        const mexican = await Recipe.find({'category': 'Mexican'}).limit(limitNumber);
        const chinese = await Recipe.find({'category': 'Chinese'}).limit(limitNumber);

        const food = { latest, thai, mexican, chinese };

        res.render('index', { title: 'WokWizards - Home', categories, food, user: req.user });
    } catch(error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }

}

/**
 * Get /categories
 * Categories
 */
exports.exploreCategories= async(req,res) => {
    try {
        // database query to get categories
        const limitNumber = 20;
        const categories = await Category.find({}).limit(limitNumber);

        res.render('categories', { title: 'WokWizards - Categories', categories ,user: req.user });
    } catch(error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
}

/**
 * Get /categories/:id
 * Categories By Id
 */
exports.exploreCategoriesById = async(req,res) => {
    try {
        let categoryId = req.params.id;

        // database query to get categories
        const limitNumber = 20;
        const categoryById = await Recipe.find({ 'category': categoryId }).limit(limitNumber);

        res.render('categories', { title: 'WokWizards - Categories', categoryById, user: req.user });
    } catch(error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
}

/**
 * Get /recipe/:id
 * Recipe
 */
exports.exploreRecipe= async(req,res) => {
    try {
        let recipeId = req.params.id; //gets id from the id of the recipe which is in the url
        const recipe = await Recipe.findById(recipeId);
        const comments = await Comment.find({ recipeId: recipeId }).sort({ date: -1 }); //Comments sorted by latest

        //Calculating average rating
        const averageRating = comments.length > 0 
        ? comments.reduce((acc, comment) => acc + comment.rating, 0) / comments.length.toFixed(1)
        : 0;

        res.render('recipe', { title: 'WokWizards - Recipe', recipe, user: req.user, comments, averageRating } );
    } catch(error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
}

/**
 * POST /search
 * Search
 */
exports.searchRecipe= async(req,res) => {
    try{
        let searchTerm = req.body.searchTerm; //uses the search term provided by user
        //This will search specific parts of the data in the mongoDB database
        let recipe = await Recipe.find( {$text: { $search: searchTerm, $diacriticSensitive: true } } );
        res.render('search', { title: 'WokWizards - Search' , recipe, user: req.user } );
    } catch(error) {
        res.status(500).send({message: error.message || "Error Occured"});

    }    

}

/**
 * Get /explore-latest
 * Explore Latest
 */
exports.exploreLatest= async(req,res) => {
    try {
        const limitNumber = 20;
        const recipe = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);

        res.render('explore-latest', { title: 'WokWizards - Explore Latest', recipe, user: req.user } );
    } catch(error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
}

/**
 * Get /explore-random
 * Explore Random
 */
exports.exploreRandom= async(req,res) => {
    try {

        let count = await Recipe.find().countDocuments();
        let random = Math.floor(Math.random() * count);
        let recipe = await Recipe.findOne().skip(random).exec();

        res.render('explore-random', { title: 'WokWizards - Explore Random', recipe, user: req.user } );
    } catch(error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
}

/**
 * Get /submit-recipe
 * Submit Recipe
 */
exports.submitRecipe= async(req,res) => {
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('submit-recipe', { title: 'WokWizards - Submit Recipe', user: req.user, infoErrorsObj, infoSubmitObj  } );
}

/**
 * POST /submit-recipe
 * Submit Recipe
 */
exports.submitRecipeOnPost = async(req,res) => {
    try {
        let imageUploadFile;
        let uploadPath;
        let newImageName;

        if(!req.files || Object.keys(req.files).length === 0) {
            console.log('No Files were uploaded.'); 
        }  else {

            imageUploadFile = req.files.image;
            newImageName = Date.now() + imageUploadFile.name; //creates unique image name

            uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

            imageUploadFile.mv(uploadPath, function(err){
                if(err) return res.status(500).send(err);
            });
        }
        const newRecipe = new Recipe({
            author: req.user.displayName, // Uses the authenticated user's display name
            email: req.user.email, // Uses the authenticated user's email
            name: req.body.name,
            description: req.body.description,
            ingredients: req.body.ingredients,
            category: req.body.category,
            diets: req.body.diets,
            duration:req.body.duration,
            persons: req.body.persons,
            calories:req.body.calories,
            fats:req.body.fats,
            carbohydrates:req.body.carbohydrates,
            protein:req.body.protein,
            sugar:req.body.sugar,
            salt:req.body.salt,
            saturates:req.body.saturates,
            fibre:req.body.fibre,
            image: newImageName
        });

        await newRecipe.save();

        req.flash('infoSubmit', 'Recipe has been added!');
        res.redirect('/submit-recipe');
    } catch(error) {
        req.flash('infoErrors', error );
        res.redirect('/submit-recipe');
    }

}
/**
 * GET /author-recipes
 * Author's recipes
 */
exports.getAuthorRecipes = async (req, res) => {
    try {
        const authorEmail = req.params.email;
        const recipes = await Recipe.find({ email: authorEmail }).sort({_id: -1});
        res.render('author-recipes', { title: 'Author Recipes', recipes, user: req.user });
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error occurred' });
    }
};

/**
 * GET /recipe/:_id/edit
 * Edit Recipes
 */
exports.editRecipe = async (req, res) => {
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');

    try {
        const recipeId = req.params.id.trim();        
        const recipe = await Recipe.findById(recipeId);

        // Check if the recipe exists and the user is the owner
        if (!recipe || recipe.email !== req.user.email) {
            return res.status(403).send('You do not have permission to edit this recipe.');
        }

        res.render('edit-recipe', { title: 'Edit Recipe', infoErrorsObj,infoSubmitObj, recipe, user: req.user });
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error Occurred' });
    }
};

/**
 * PUT /recipe/:_id/edit
 * Update Recipes
 */
exports.updateRecipe = async (req, res) => {
    try {
        const recipeId = req.params.id;
        let recipe = await Recipe.findById(recipeId);

        // Check if the recipe exists and the user is the owner
        if (!recipe || recipe.email !== req.user.email) {
            return res.status(403).send('You do not have permission to edit this recipe.');
        }

        // Update recipe fields
        recipe.author = req.body.author;
        recipe.email = req.body.email;
        recipe.name = req.body.name;
        recipe.description = req.body.description;
        recipe.ingredients = req.body.ingredients;
        recipe.category = req.body.category;
        recipe.diets = req.body.diets;
        recipe.duration = req.body.duration;
        recipe.persons = req.body.persons;
        recipe.calories = req.body.calories;
        recipe.fats = req.body.fats;
        recipe.carbohydrates = req.body.carbohydrates;
        recipe.protein = req.body.protein;
        recipe.sugar = req.body.sugar;
        recipe.salt = req.body.salt;
        recipe.saturates = req.body.saturates;
        recipe.fibre = req.body.fibre;

        if (req.file) {
            recipe.image = req.file.filename;
        }

        await recipe.save();

        res.redirect(`/recipe/${recipe._id}`);
        req.flash('infoSubmit', 'Recipe has been updated!');
    } catch (error) {
        req.flash('infoErrors', error );
        res.status(500).send({ message: error.message || 'Error Occurred' });
    }
};

/**
 * DELETE recipe/:id
 * Deletes Recipes 
 */
exports.deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        // Check if the logged-in user is the author of the recipe
        if (recipe.email.toString() !== req.user.email.toString()) {
            req.flash('error', 'You do not have permission to delete this recipe');
            return res.redirect(`/recipe/${req.params.id}`);
        }

        await Recipe.findByIdAndDelete(req.params.id);
        req.flash('success', 'Recipe deleted successfully');
        res.redirect('/author/:email');
    } catch (error) {
        console.error(error);
        req.flash('error', 'An error occurred while trying to delete the recipe');
        res.redirect('/');
    }
};

/**
 * POST /recipe/:id/comment
 * Submit Comment
 */
exports.submitComment = async (req, res) => {
    try {
        const { name, email, comment, rating } = req.body;
        const recipeId = req.params.id; // recipe ID from the URL

        // Create a new comment
        const newComment = new Comment({
            name,
            email,
            comment,
            rating,
            recipeId
        });

        await newComment.save();

        req.flash('infoSubmit', 'Comment has been added!');
        res.redirect(`/recipe/${recipeId}`);
    } catch (error) {
        req.flash('infoErrors', error.message);
        res.redirect(`/recipe/${req.params.id}`);
    }
};

/**
 * GET /user/comments
 * Users Comments
 */
exports.userComments = async(req, res) => {
    if (!req.user) {
        return res.redirect('/auth/google'); // Redirect to login if not authenticated
    }

    try {
        // Fetch comments by the user's email
        const comments = await Comment.find({ email: req.user.email }).populate('recipeId');
        
        res.render('user-comments', { title: 'Your Comments', user: req.user ,comments});
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

/**
 * POST /user/comments
 * Delete Comments
 */
exports.deleteComment = async(req, res) => {
    if (!req.user) {
        return res.redirect('/auth/google'); // Redirect to login if not authenticated
    }

    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.redirect('/user/comments'); // Redirect back to the user's comments page
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

/**
 * GET /user/comments/:id/edit
 * Edit Comment
 */
exports.editComment = async(req, res) => {
    if (!req.user) {
        return res.redirect('/auth/google'); // Redirect to login if not authenticated
    }

    try {
        const comment = await Comment.findById(req.params.id);
        res.render('edit-comment', {  title: 'Edit Comment', user: req.user ,comment });
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

/**
 * POST /user/comments/:id/edit
 * Edit Comment
 */
exports.editCommentOnPost = async(req, res) => {
    console.log('Editing comment:', req.params.id);
    if (!req.user) {
        return res.redirect('/auth/google'); // Redirect to login if not authenticated
    }

    try {
        await Comment.findByIdAndUpdate(req.params.id, {
            comment: req.body.comment,
            rating: req.body.rating
        });
        res.redirect('/user/comments'); // Redirect back to the user's comments page
    } catch (error) {
        res.status(500).send('Server Error');
    }
};
