const passport = require('passport');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const LocalStrategy = require('passport-local').Strategy;

// Authentication using passport
function initialize(passport, getUserByEmail, getUserById){
    const authenticator =  function(email, password, done){
        User.findOne({email: email}, function(err,user){
            if(err){
                console.log(`Error in finding user --> Passport: ${err}`);
            }            
            if(!user){
                return done(null, false); // email doesn't exists
            }
            try {
                if(bcrypt.compare(password, user.password))
                {
                    return done(null, user); // user is successfully logged in
                }
                else{
                    return done(null, false); // password is incorrect
                }
            } catch (error) {
                return done(error);
            }
        });        
    }
    passport.use(new LocalStrategy({usernameField: 'email'}, authenticator));

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
            return res.redirect('/users/profile');
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