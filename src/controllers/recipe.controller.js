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

const getAllRecipes = async (req, res, next) => {
    try {
        const allRecipes = await recipeServices.getAllRecipes();
        console.log(allRecipes);
        res.status(200).json({
            status: 'success',
            data: allRecipes,
        });
    } catch (err) {
        throw err;
    }
};

const getOneRecipe = async (req, res, next) => {
    const id = req.params.id;
    const recipe = await recipeServices.getOneRecipe(id);
    if (recipe[0] === undefined) {
        return res
            .status(404)
            .json({ status: 'error', message: 'Recipe not found' });
    }
    return res.status(200).json({
        status: 'success',
        data: recipe,
    });
};

const deleteRecipe = async (req, res, next) => {
    const id = req.params.id;
    const recipe = await recipeServices.deleteRecipe(id);
    res.status(200).json({
        status: 'success',
        message: 'Recipe deleted',
        data: recipe,
    });
};

const updateRecipe = async (req, res, next) => {
    const { id } = req.body;
    // TODO: Only user who created can edit a recipe
};

const updateLikes = async (req, res, next) => {
    // TODO: add a controller to update likes in a recipe
};
module.exports = { createRecipe, getAllRecipes, getOneRecipe, deleteRecipe };
