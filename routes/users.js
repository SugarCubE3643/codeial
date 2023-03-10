const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

// The routes will be in the format root/users and the last part will be used from the router here (e.g. root/users/profile)
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);

router.get('/sign-up', passport.checkNotAuthenticated, usersController.signUp);
router.get('/sign-in', passport.checkNotAuthenticated, usersController.signIn);

router.post('/create-user', usersController.createUser);
router.post('/create-session', 
    passport.authenticate(
        'local', 
        { 
            failureRedirect: '/users/sign-in', 
            successRedirect: '/' 
        }), 
        usersController.createSession
);
router.delete('/sign-out', usersController.destroySession);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), usersController.createSession);



module.exports = router;