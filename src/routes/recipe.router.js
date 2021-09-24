const express = require('express');
const router = express.Router();
const {
    createRecipe,
    getAllRecipes,
    getOneRecipe,
    deleteRecipe,
    updateLikes,
    updateRecipe,
} = require('../controllers/recipe.controller');

router.post('/', createRecipe).get('/', getAllRecipes);

router
    .get('/:id', getOneRecipe)
    .delete('/:id', deleteRecipe)
    .put('/:id', updateRecipe);

router.put('/like/:id', updateLikes);
module.exports = router;
