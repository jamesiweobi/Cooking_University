const express = require('express');
const hbs = require('express-handlebars');
const app = express();
const userRouter = require('./src/routes/user.routes');
const recipesRouter = require('./src/routes/recipe.router');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { authMiddleWare, signToken } = require('./src/utils/utils');
const RecipeServices = require('./src/services/recipe.services');
const recipeServices = new RecipeServices();
const UserServices = require('./src/services/user.services');
const userServices = new UserServices();
require("dotenv").config()

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Verify and set User state
app.use('/', authMiddleWare);

// HandleBars setting
app.set('view engine', 'hbs');
app.engine(
    'hbs',
    hbs({
        extname: 'hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials',
        helpers: {
            loadUrl: function (aString, bString) {
                return `/recipe-details?userId=${aString}&recipe=${bString}`;
            },
            homePage: function (aString) {
                return `/recipe/${aString}`;
            },
            shareRecipe: function (sString) {
                let result = '/create-recipe/' + sString;
                return result;
            },
            recipeSrc: function (sString) {
                return `/recipes-page/` + sString;
            },
            logOutSrc: function (sString) {
                return `/logout-user/` + sString;
            },
            editRecipe: function (id) {
                return `/recipe/${id}`;
            },
            deleteRecipe: function (id) {
                return `deleteRecipe('${id}')`;
            },
            likeRecipe: function (id) {
                return `likeRecipe('${id}')`;
            },
            editUrl: function (aString, bString) {
                return `/edit-recipe?userId=${aString}&recipe=${bString}`;
            },
            ingredients: function (aString) {
                return aString.reduce((word, index) => {
                    word + ` ${index}`;
                }, '');
            },
        },
    })
);

app.use('/user', userRouter);
app.use('/recipe', recipesRouter);

app.get('/home', (req, res) => {
    res.render('home', { layout: 'index' });
});

app.get('/signin', (req, res) => {
    res.render('signin', { layout: 'index' });
});

app.get('/signup', (req, res) => {
    res.render('signup', { layout: 'index' });
});

app.get('/recipes-page/:slug', async (req, res) => {
    const id = req.params.slug;
    try {
        const user = await userServices.getUser(id);
        const recipes = await recipeServices.getAllRecipes();
        recipes.map((recipes) => (recipes.loggedInUser = user[0].id));
        res.render('all-recipes', {
            layout: 'index',
            data: user[0],
            recipes: recipes,
        });
    } catch (err) {
        console.log(err);
    }
});

app.get('/edit-recipe/', async (req, res) => {
    try {
        const id = req.query.userId;
        const recipeId = req.query.recipe;
        const user = await userServices.getUser(id);
        const recipes = await recipeServices.getOneRecipe(recipeId);
        const data = user[0];
        const recipeData = recipes.data.data;
        res.render('edit-recipe', {
            layout: 'index',
            data: data,
            recipe: recipeData,
        });
    } catch (err) {
        console.log('err');
    }
});
app.get('/recipe-details/', async (req, res) => {
    try {
        const id = req.query.userId;
        const recipeId = req.query.recipe;
        const user = await userServices.getUser(id);
        const recipes = await recipeServices.getOneRecipe(recipeId);
        const recipeData = recipes[0];
        let correctUser;
        const recipeTest = recipeData.createBy;
        let test = id === recipeTest;
        if (test) {
            correctUser = true;
        } else {
            correctUser = false;
        }
        recipeData.correctUser = correctUser;
        res.render('recipe-details', {
            layout: 'index',
            data: user[0],
            recipe: recipeData,
        });
    } catch (err) {
        console.log(err);
    }
});

app.get('/create-recipe/:slug', async (req, res) => {
    const id = req.params.slug;
    try {
        const user = await userServices.getUser(id);
        res.render('create-recipe', { layout: 'index', user: user[0] });
    } catch (err) {
        console.log(err);
    }
});

app.get('/logout-user/:slug', async (req, res) => {
    const id = req.params.slug;
    try {
        const payload = {
            user_Id: id,
        };
        const token = await signToken(payload, '1s');
        res.cookie(
            'access_token',
            { token: token },
            {
                httpOnly: true,
            }
        ).redirect('/home');
    } catch (err) {
        throw err;
    }
});

app.get('/', (req, res) => {
    res.render('home', { layout: 'index' });
});
const Port = process.env.PORT || 4000;
app.listen(Port, () => {
    console.log(`Port listening on http://localhost:${Port}`);
});
