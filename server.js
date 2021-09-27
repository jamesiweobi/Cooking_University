const express = require('express');
const hbs = require('express-handlebars');
const app = express();
const userRouter = require('./src/routes/user.routes');
const recipesRouter = require('./src/routes/recipe.router');
const cors = require('cors');
const axios = require('axios');
const admin = require('./src/fireBaseDB/fireBase');
const cookieParser = require('cookie-parser');
const { authMiddleWare, signToken } = require('./src/utils/utils');
const ExpressHandlebars = require('express-handlebars/lib/express-handlebars');
require('dotenv').config();

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
        defaultLayout: 'index',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials',
        helpers: {
            loadUrl: function (aString, bString) {
                return `http://localhost:4000/recipe-details?userId=${aString}&recipe=${bString}`;
            },
            homePage: function (aString) {
                return `http://localhost:4000/recipe/${aString}`;
            },
            shareRecipe: function (sString) {
                let result = 'http://localhost:4000/create-recipe/' + sString;
                return result;
            },
            recipeSrc: function (sString) {
                return `/recipes-page/` + sString;
            },
            logOutSrc: function (sString) {
                return `/logout-user/` + sString;
            },
            editRecipe: function (id) {
                return `http://localhost:4000/recipe/${id}`;
            },
            deleteRecipe: function (id) {
                return `deleteRecipe('${id}')`;
            },
            likeRecipe: function (id) {
                return `likeRecipe('${id}')`;
            },
            editUrl: function (aString, bString) {
                return `http://localhost:4000/edit-recipe?userId=${aString}&recipe=${bString}`;
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
        const user = await axios(`http://localhost:4000/user/${id}`);
        const recipes = await axios('http://localhost:4000/recipe');
        const { data } = user;
        const recipeData = recipes.data.data;
        recipeData.forEach((recipe) => {
            recipe.userId = data.id;
            recipe.loggedInUser = data.id;
        });
        res.render('all-recipes', {
            layout: 'index',
            data: data,
            recipes: recipeData,
        });
    } catch (err) {
        console.log(err);
    }
});

app.get('/edit-recipe/', async (req, res) => {
    try {
        const userId = req.query.userId;
        const recipeId = req.query.recipe;
        const user = await axios(`http://localhost:4000/user/${userId}`);
        const recipes = await axios(`http://localhost:4000/recipe/${recipeId}`);
        const { data } = user;
        const recipeData = recipes.data.data;
        res.render('edit-recipe', {
            layout: 'index',
            data: data,
            recipe: recipeData,
        });
    } catch (err) {
        console.log(err);
    }
});
app.get('/recipe-details/', async (req, res) => {
    try {
        const userId = req.query.userId;
        const recipeId = req.query.recipe;
        const user = await axios(`http://localhost:4000/user/${userId}`);
        const recipes = await axios(`http://localhost:4000/recipe/${recipeId}`);
        const { data } = user;
        const recipeData = recipes.data.data;
        let correctUser;
        const userID = data.id;
        const recipeTest = recipeData.createBy;
        let test = userID === recipeTest;

        console.log(recipeData.data, data, 'hhhhhhhhhhhhhh');
        if (test) {
            correctUser = true;
        } else {
            correctUser = false;
        }
        recipeData.correctUser = correctUser;
        res.render('recipe-details', {
            layout: 'index',
            data: data,
            recipe: recipeData,
        });
    } catch (err) {
        console.log(err);
    }
});

app.get('/create-recipe/:slug', async (req, res) => {
    const id = req.params.slug;
    try {
        const user = await axios(`http://localhost:4000/user/${id}`);
        const { data } = user;
        res.render('create-recipe', { layout: 'index', user: data });
    } catch (err) {
        console.log(err);
    }
});

app.get('/logout-user/:slug', async (req, res) => {
    admin.collection('Users');
    const id = req.params.slug;
    try {
        const payload = {
            user_Id: id,
        };
        const token = await signToken(payload, '1s');
        console.log(token);
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

const Port = process.env.PORT || 4000;
app.listen(Port, () => {
    console.log(`Port listening on http://localhost:${Port}`);
});
