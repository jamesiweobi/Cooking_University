const RecipeServices = require('../services/recipe.services');
const recipeServices = new RecipeServices();

const createRecipe = (req, res, next) => {
    const {
        meal,
        ingredients,
        prepMethod,
        description,
        category,
        foodImageUrl,
        categoryImageUrl,
        likesCounter,
        createBy,
    } = req.body;
    const recipe = {
        meal,
        ingredients,
        prepMethod,
        description,
        category,
        foodImageUrl,
        categoryImageUrl,
        likesCounter,
        createBy,
    };
    const newRecipe = recipeServices.createRecipe(recipe);
    res.status(201).json({
        status: 'success',
        message: 'New Recipe created successfully',
    });
};

module.exports = { createRecipe };
