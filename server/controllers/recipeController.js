require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');

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

        res.render('index', { title: 'WokWizards - Home', categories, food });
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

        res.render('categories', { title: 'WokWizards - Categories', categories });
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

        res.render('categories', { title: 'WokWizards - Categories', categoryById });
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
        let recipeId = req.params.id; //gets id from recipe
        const recipe = await Recipe.findById(recipeId);

        res.render('recipe', { title: 'WokWizards - Recipe', recipe } );
    } catch(error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
}

/**
 * POST /search
 * Search
 */

exports.searchRecipe= async(req,res) => {

    res.render('search', { title: 'WokWizards - Search' } );
}


//Initial code for initialising the categories & recipes in mongoDB
// async function insertDymmyCategoryData() {
//     try {
//         await Category.insertMany([
//             {
//                 "name": "Thai",
//                 "image": "guacamole egg toast.avif" 
//             },
//             {
//                 "name": "American",
//                 "image": "vegan ramen.avif" 
//             },
//             {
//                 "name": "Chinese",
//                 "image": "wanton mee.avif" 
//             },
//             {
//                 "name": "Mexican",
//                 "image": "wanton mee.avif" 
//             },
//             {
//                 "name": "Indian",
//                 "image": "Chicken katsu rice.avif" 
//             },
//             {
//                 "name": "Spanish",
//                 "image": "fried egg dish.avif" 
//             }
//         ]);
//     } catch (error) {
//         console.log('err', + error)
//     }
// }

// insertDymmyCategoryData();

// // Initial code for initialising the recipes in mongoDB
// async function insertDymmyRecipeData() {
//     try {
//         await Recipe.insertMany([
//             {
//                 "name": "Mexican dish recipe",
//                 "description": `Line a sieve with pieces of kitchen paper, tip in the yoghurt and pull up the paper and very gently apply pressure so that the liquid starts to drip through into a bowl, then leave to drain.
//                 Peel and trim just the portobello mushrooms, then peel and quarter the onion and separate into petals.
//                 Peel the garlic, roughly chop the preserved lemons, discarding any pips, and bash to a paste in a pestle and mortar with ½ a teaspoon of sea salt, 1 teaspoon of black pepper and the spices.
//                 Muddle in 1 tablespoon of oil, then toss with all the mushrooms and onions. Marinate for at least 2 hours, preferably overnight.
//                 When you're ready to cook, preheat the oven to full whack (240ºC/475ºF/ gas 9).
//                 Randomly thread the mushrooms and onions on to a large skewer, then place on a large baking tray and roast for 20 minutes, turning occasionally.
//                 Push the veg together so it's all snug, baste with any juices from the tray, then roast for a further 15 minutes, or until gnarly, drizzling over the pomegranate molasses for the last 3 minutes.
//                 Meanwhile, finely slice the radishes and cucumber, ideally on a mandolin (use the guard!), and quarter the tomatoes, toss with a pinch of salt and the vinegar, then leave aside.
//                 Tip the jalapeños (juices and all) into a blender, then pick in most of the mint leaves and whiz until fine. Pour back into the jar - this will keep in the fridge for a couple of weeks for jazzing up future meals.
//                 Warm the flatbreads, spread with tahini, then sprinkle over the pickled veg, remaining mint leaves and dukkah.
//                 Carve and scatter over the gnarly veg, dollop over the hung yoghurt, drizzle with jalapeño salsa, then roll up, slice and tuck in. 
                
//                 Source: https://www.jamieoliver.com/recipes/mushroom/crispy-mushroom-shawarma/`,
//                 "email": "morganfreemanpeace@gmail.com",
//                 "ingredients": [
//                     "200g natural yoghurt",
//                     "800g portobello and oyster mushrooms",
//                     "1 red onion",
//                     "2 cloves of garlic",
//                     "2 preserved lemons",
//                     "1 teaspoon ground cumin",
//                     "1 teaspoon ground allspice",
//                     "1 teaspoon smoked paprika",
//                     "olive oil",
//                     "2 tablespoons pomegranate molasses",
//                     "10 radishes, ideally with leaves",
//                     "½ a cucumber",
//                     "100g ripe cherry tomatoes",
//                     "1 tablespoon white wine vinegar",
//                     "1 x 200g jar of pickled jalapeño chillies",
//                     "1 bunch of fresh mint (30g)",
//                     "4 large flatbreads",
//                     "4 tablespoons tahini",
//                     "2 tablespoons dukkah"
//                 ],
//                 "category": "Mexican",
//                 "image": "Chicken katsu rice.avif"
//             },
//             {
//                 "name": "Thai dish recipe",
//                 "description": `Line a sieve with pieces of kitchen paper, tip in the yoghurt and pull up the paper and very gently apply pressure so that the liquid starts to drip through into a bowl, then leave to drain.
//                 Peel and trim just the portobello mushrooms, then peel and quarter the onion and separate into petals.
//                 Peel the garlic, roughly chop the preserved lemons, discarding any pips, and bash to a paste in a pestle and mortar with ½ a teaspoon of sea salt, 1 teaspoon of black pepper and the spices.
//                 Muddle in 1 tablespoon of oil, then toss with all the mushrooms and onions. Marinate for at least 2 hours, preferably overnight.
//                 When you're ready to cook, preheat the oven to full whack (240ºC/475ºF/ gas 9).
//                 Randomly thread the mushrooms and onions on to a large skewer, then place on a large baking tray and roast for 20 minutes, turning occasionally.
//                 Push the veg together so it's all snug, baste with any juices from the tray, then roast for a further 15 minutes, or until gnarly, drizzling over the pomegranate molasses for the last 3 minutes.
//                 Meanwhile, finely slice the radishes and cucumber, ideally on a mandolin (use the guard!), and quarter the tomatoes, toss with a pinch of salt and the vinegar, then leave aside.
//                 Tip the jalapeños (juices and all) into a blender, then pick in most of the mint leaves and whiz until fine. Pour back into the jar - this will keep in the fridge for a couple of weeks for jazzing up future meals.
//                 Warm the flatbreads, spread with tahini, then sprinkle over the pickled veg, remaining mint leaves and dukkah.
//                 Carve and scatter over the gnarly veg, dollop over the hung yoghurt, drizzle with jalapeño salsa, then roll up, slice and tuck in. 
                
//                 Source: https://www.jamieoliver.com/recipes/mushroom/crispy-mushroom-shawarma/`,
//                 "email": "morganfreemanpeace@gmail.com",
//                 "ingredients": [
//                     "200g natural yoghurt",
//                     "800g portobello and oyster mushrooms",
//                     "1 red onion",
//                     "2 cloves of garlic",
//                     "2 preserved lemons",
//                     "1 teaspoon ground cumin",
//                     "1 teaspoon ground allspice",
//                     "1 teaspoon smoked paprika",
//                     "olive oil",
//                     "2 tablespoons pomegranate molasses",
//                     "10 radishes, ideally with leaves",
//                     "½ a cucumber",
//                     "100g ripe cherry tomatoes",
//                     "1 tablespoon white wine vinegar",
//                     "1 x 200g jar of pickled jalapeño chillies",
//                     "1 bunch of fresh mint (30g)",
//                     "4 large flatbreads",
//                     "4 tablespoons tahini",
//                     "2 tablespoons dukkah"
//                 ],
//                 "category": "Thai",
//                 "image": "fried egg dish.avif"
//             },
//             {
//                 "name": "Chinese dish recipe",
//                 "description": `Line a sieve with pieces of kitchen paper, tip in the yoghurt and pull up the paper and very gently apply pressure so that the liquid starts to drip through into a bowl, then leave to drain.
//                 Peel and trim just the portobello mushrooms, then peel and quarter the onion and separate into petals.
//                 Peel the garlic, roughly chop the preserved lemons, discarding any pips, and bash to a paste in a pestle and mortar with ½ a teaspoon of sea salt, 1 teaspoon of black pepper and the spices.
//                 Muddle in 1 tablespoon of oil, then toss with all the mushrooms and onions. Marinate for at least 2 hours, preferably overnight.
//                 When you're ready to cook, preheat the oven to full whack (240ºC/475ºF/ gas 9).
//                 Randomly thread the mushrooms and onions on to a large skewer, then place on a large baking tray and roast for 20 minutes, turning occasionally.
//                 Push the veg together so it's all snug, baste with any juices from the tray, then roast for a further 15 minutes, or until gnarly, drizzling over the pomegranate molasses for the last 3 minutes.
//                 Meanwhile, finely slice the radishes and cucumber, ideally on a mandolin (use the guard!), and quarter the tomatoes, toss with a pinch of salt and the vinegar, then leave aside.
//                 Tip the jalapeños (juices and all) into a blender, then pick in most of the mint leaves and whiz until fine. Pour back into the jar - this will keep in the fridge for a couple of weeks for jazzing up future meals.
//                 Warm the flatbreads, spread with tahini, then sprinkle over the pickled veg, remaining mint leaves and dukkah.
//                 Carve and scatter over the gnarly veg, dollop over the hung yoghurt, drizzle with jalapeño salsa, then roll up, slice and tuck in. 
                
//                 Source: https://www.jamieoliver.com/recipes/mushroom/crispy-mushroom-shawarma/`,
//                 "email": "morganfreemanpeace@gmail.com",
//                 "ingredients": [
//                     "200g natural yoghurt",
//                     "800g portobello and oyster mushrooms",
//                     "1 red onion",
//                     "2 cloves of garlic",
//                     "2 preserved lemons",
//                     "1 teaspoon ground cumin",
//                     "1 teaspoon ground allspice",
//                     "1 teaspoon smoked paprika",
//                     "olive oil",
//                     "2 tablespoons pomegranate molasses",
//                     "10 radishes, ideally with leaves",
//                     "½ a cucumber",
//                     "100g ripe cherry tomatoes",
//                     "1 tablespoon white wine vinegar",
//                     "1 x 200g jar of pickled jalapeño chillies",
//                     "1 bunch of fresh mint (30g)",
//                     "4 large flatbreads",
//                     "4 tablespoons tahini",
//                     "2 tablespoons dukkah"
//                 ],
//                 "category": "Chinese",
//                 "image": "guacamole egg toast.avif"
//             }
            
//         ]);
//     } catch (error) {
//         console.log('err', + error)
//     }
// }

// insertDymmyRecipeData();