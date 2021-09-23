const express = require('express');
const router = express.Router();
const {
    createRecipe,
    getAllRecipes,
    getOneRecipe,
    deleteRecipe,
} = require('../controllers/recipe.controller');

router.post('/', createRecipe).get('/', getAllRecipes);
router.get('/:id', getOneRecipe).delete('/:id', deleteRecipe);

module.exports = router;
