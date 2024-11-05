require("dotenv").config();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID, //Replace with your own GOOGLE_ClIENT_ID
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, //Replace with your own GOOGLE_CLIENT_SECRET
    callbackURL: `${process.env.BASE_URL}/google/callback`,
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});
