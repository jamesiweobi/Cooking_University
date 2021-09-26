const express = require('express');
const router = express.Router();
const {
    createRecipe,
    getAllRecipes,
    getOneRecipe,
    deleteRecipe,
    updateLikes,
    updateRecipe,
    allUserRecipe,
} = require('../controllers/recipe.controller');

router.post('/', createRecipe).get('/', getAllRecipes);

router
    .get('/:id', getOneRecipe)
    .delete('/:id', deleteRecipe)
    .put('/:id', updateRecipe);
router.get('/user-recipe/:id', allUserRecipe);
router.put('/like/:id', updateLikes);
module.exports = router;
