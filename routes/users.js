const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

// The routes will be in the format root/users and the last part will be used from the router here (e.g. root/users/profile)
router.get('/profile', passport.checkAuthentication, usersController.profile);
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

module.exports = router;