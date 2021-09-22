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
            const recipesList = snapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return recipesList;
        } catch (err) {
            throw err;
        }
    };

    getOneRecipes = async (id) => {
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
}

module.exports = RecipeServices;
