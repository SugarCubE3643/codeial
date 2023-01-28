const passport = require('passport');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}

passport.use(new JwtStrategy(options, function(jwtPayload, done){
    User.findById(jwtPayload._id, function(err, user){
        if(err){console.log('Error in finding the user from JWT'); return;}

        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    })
}) );

module.exports = passport;