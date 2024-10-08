require("dotenv").config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');
const methodOverride = require('method-override');
require('./auth');

function isLoggedIn(req,res,next) {
    if(req.user) {
        return next();
    } else {
        res.redirect('/auth/google');
    }
}
module.exports = { isLoggedIn };

const app = express();
const port = process.env.PORT || 5000;

//Initialises method-override
app.use(methodOverride('_method'));

//Allows us not to use full path files like images
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressLayouts);

app.use(cookieParser('CookingBlogSecure'));

app.use(session({ 
    secret: process.env.SESSION_SECRET, //Replace with your own SESSION_SECRET
    resave: true,
    saveUninitialized: true
}));

//Flash and file upload middleware
app.use(flash());
app.use(fileUpload());

//Initialise Passport.js
app.use(passport.initialize());
app.use(passport.session());


//Stores layout in layouts/main.ejs
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

//Accessing the routes and using them here
const routes = require('./server/routes/recipeRoutes.js');
app.use('/', routes);

// app.get('/', (req,res) => {
//     res.send('<a href="/auth/google"> Authenticate with Google </a>');
// });

app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['email', 'profile'],
        prompt: 'select_account' //Forces user to select an account every time
    })
);

app.get('/google/callback',
    passport.authenticate('google',{
        successRedirect: '/', 
        failureRedirect: '/auth/failure',
    })
);

app.get('/auth/failure', (req,res) => {
    res.send('Something went wrong...');
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
    res.redirect('/');
});

app.listen(port, () => console.log(`listening on port: ${port}`));
