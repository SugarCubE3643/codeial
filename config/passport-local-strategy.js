const passport = require('passport');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const LocalStrategy = require('passport-local').Strategy;

// Authentication using passport
function initialize(passport, getUserByEmail, getUserById){
    const authenticator =  async function(req, email, password, done){
        
        try {
            let user = await User.findOne({email: email});        

            if(!user){
                req.flash('error', 'Invalid Username / Password');
                return done(null, false); // email doesn't exists
            }
            // await bcrypt.compare(password, user.password)
            if(password == user.password)
            {
                req.flash('success', 'Successfully logged in');
                return done(null, user); // user is successfully logged in
            }
            else{
                req.flash('error', 'Invalid Username / Password');
                return done(null, false); // password is incorrect
            }
        } catch (error) {
            req.flash('error', error);
            return done(error);
        }
    }
    passport.use(new LocalStrategy({usernameField: 'email', passReqToCallback: true}, authenticator));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
      
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            if(err){
                console.log(`Error in finding the user --> Passport: ${err} `);
                return done(err);
            }
            return done(null, user);
        });
    });

    passport.checkAuthentication = function (req, res, next){
        if(req.isAuthenticated())
        {
            return next();
        }
        return res.redirect('/users/sign-in');
    }

    passport.checkNotAuthenticated = function (req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect('/');
        }
        next();
    }

    passport.setAuthenticatedUser = function(req, res, next){
        if(req.isAuthenticated()){
            res.locals.user = req.user;
        }
        next();
    }
}

module.exports = initialize;