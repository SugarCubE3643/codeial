const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');

// The routes will be in the format root/users and the last part will be used from the router here (e.g. root/users/profile)
router.get('/profile', usersController.profile);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.post('/create-user', usersController.createUser);
router.post('/create-session', usersController.createSession);

router.get('/logout', usersController.logout);
module.exports = router;