const express = require('express');
const hbs = require('express-handlebars');
const app = express();
const jwt = require('jsonwebtoken');
const userRouter = require('./src/routes/user.routes');
const recipesRouter = require('./src/routes/recipe.router');
const cors = require('cors');
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
app.get('/', (req, res) => {
    res.render('home', { layout: 'index' });
});

const Port = process.env.PORT || 4000;
app.listen(Port, () => {
    console.log(`Port listening on http://localhost:${Port}`);
});
