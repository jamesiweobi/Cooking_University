const admin = require('../fireBaseDB/fireBase');

class RecipeServices {
    constructor() {
        this.admin = admin.collection('Recipes');
    }
    createRecipe = async (recipe) => {
        try {
            return await this.admin.doc().set({ recipe });
        } catch (err) {
            throw err;
        }
    };

    getAllRecipes = async () => {
        try {
            const snapShot = await this.admin.get();
            const list = snapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return list;
        } catch (err) {
            throw err;
        }
    };

    getOneRecipe = async (id) => {
        try {
            const snapShot = await this.admin.get();
            const recipesList = snapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return recipesList.filter((doc) => doc.id === id);
        } catch (err) {
            throw err;
        }
    };

    deleteRecipe = async (id) => {
        try {
            return this.admin.doc(id).delete();
        } catch (err) {
            throw err;
        }
    };

    updateRecipe = async (id, recipeBody) => {
        try {
            delete recipeBody.id;
            return this.admin.doc(id).update(recipeBody);
        } catch (err) {
            throw err;
        }
    };
    updateLikes = async (find) => {
        try {
            const snapShot = await this.admin.get();
            const recipesList = snapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const recipe = recipesList.filter((doc) => doc.id === find)[0];
            recipe.recipe.likesCounter += 1;
            const { id } = recipe;
            delete recipe.id;
            return await this.admin.doc(id).update(recipe);
        } catch (err) {
            throw err;
        }
    };
}

module.exports = RecipeServices;
