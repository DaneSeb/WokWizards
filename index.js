require("dotenv").config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
require('./auth');

function isLoggedIn(req,res,next) {
    req.user ? next() : res.sendStatus(401);
}

const app = express();
const port = process.env.PORT || 5000;

//Allows us not to use full path files like images
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressLayouts);

//Stores layout in layouts/main.ejs
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

//Accessing the routes and using them here
const routes = require('./server/routes/recipeRoutes.js');
app.use('/', routes);

app.use(session({ 
    secret: process.env.SESSION_SECRET, //Replace with your own SESSION_SECRET
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req,res) => {
    res.send('<a href="/auth/google"> Authenticate with Google </a>');
});

app.get('/auth/google',
    passport.authenticate('google', {scope: ['email', 'profile']})
)

app.get('/google/callback',
    passport.authenticate('google',{
        successRedirect: '/protected', 
        failureRedirect: '/auth/failure',
    })
);

app.get('/auth/failure', (req,res) => {
    res.send('Something went wrong...');
});

app.get('/protected', isLoggedIn, (req, res) => {
    res.send(`Hello ${req.user.displayName}! <a href="/logout"> click here to logout </a>`);
});

app.get('/logout',(req,res,next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.session.destroy((err) => {
            if(err) {
                return next(err);
            }
        });
    });
    res.send('Goodbye!');
});

app.listen(port, () => console.log(`listening on port: ${port}`));
