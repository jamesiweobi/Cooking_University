const RecipeServices = require('../services/recipe.services');
const recipeServices = new RecipeServices();

const createRecipe = async (req, res, next) => {
    const {
        meal,
        ingredients,
        prepMethod,
        description,
        category,
        foodImageURL,
        createBy,
    } = req.body;
    const recipe = {
        meal,
        ingredients,
        prepMethod,
        description,
        category,
        foodImageURL,
        createBy,
    };
    recipe.likesCounter = 0;
    const newRecipe = await recipeServices.createRecipe(recipe);
    console.log(newRecipe);
    res.status(201).json({
        status: 'success',
        message: 'New Recipe created successfully',
    });
};

const getAllRecipes = async (req, res, next) => {
    try {
        const allRecipes = await recipeServices.getAllRecipes();
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
        data: recipe[0],
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
    const { createBy, userId, id } = req.body;
    if (createBy === userId) {
        try {
            const update = await recipeServices.updateRecipe(id, req.body);
            return res.status(200).json({
                status: 'success',
                message: 'Recipe updated successfully',
                data: update,
            });
        } catch (err) {
            throw err;
        }
    } else if (createBy !== userId) {
        return res.status(401).json({
            status: 'failed',
            message: 'Invalid Update credentials',
        });
    }
};

const updateLikes = async (req, res, next) => {
    const id = req.params.id;
    try {
        const update = await recipeServices.updateLikes(id);
        return res.status(200).json({
            status: 'success',
            message: 'Recipe updated successfully',
            data: update,
        });
    } catch (err) {
        throw err;
    }
};

const allUserRecipe = async (req, res, next) => {
    const id = req.params.id;
    const recipes = await recipeServices.allUserRecipes(id);
    res.send(recipes);
};
module.exports = {
    createRecipe,
    getAllRecipes,
    getOneRecipe,
    deleteRecipe,
    updateLikes,
    updateRecipe,
    allUserRecipe,
};
