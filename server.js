const express = require('express');
const hbs = require('express-handlebars');
const app = express();
const userRouter = require('./src/routes/user.routes');
const recipesRouter = require('./src/routes/recipe.router');
const cors = require('cors');
const axios = require('axios');
const admin = require('./src/fireBaseDB/fireBase');
const cookieParser = require('cookie-parser');
const { authMiddleWare } = require('./src/utils/utils');
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
        console.log(user);
        res.render('all-recipes', { layout: 'index' });
    } catch (err) {}
});

app.get('/recipe-details/:slug', async (req, res) => {
    try {
        const recipe = await axios(`http://localhost:4000/user/${id}`);
        // TODO: below is the data to render in the page using handle bars
    } catch (err) {}
    res.render('recipe-details', { layout: 'index' });
});

app.get('/create-recipe/:slug', (req, res) => {
    const userId = req.params.slug;
    // TODO: User ID to be used in the create recipe template
    res.render('create-recipe', { layout: 'index' });
});

app.get('/logout-user/:slug', async (req, res) => {
    admin.collection('Users');
    const id = req.params.slug;
    try {
        const snapShot = await this.admin.get();
        const list = snapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        const user = list.filter((doc) => doc.id === id);
        const payload = {
            user_Id: user.id,
        };
        user.token = await signToken(payload, '1s');
        delete user.password;
        res.cookie(
            'access_token',
            { token: user.token },
            {
                httpOnly: true,
            }
        )
            .json({
                status: 200,
                message: 'User logged out',
            })
            .redirect('/home');
    } catch (err) {
        throw err;
    }
});

const Port = process.env.PORT || 4000;
app.listen(Port, () => {
    console.log(`Port listening on http://localhost:${Port}`);
});
