// when a new instance of express is called it actually is an instance being passed on after it's called for the first time
const express = require('express');

// Creating express router
const router = express.Router();

// exporting home controller funcitons
const feedController = require('../controllers/feed_controller');

console.log('Roter is loader');

// This is the router which calls a particular action(function) from the controller
router.get('/', feedController.feed);

// This will route all paths of /users to the users.js router
router.use('/users', require('./users'));

router.use('/posts', require('./posts'));

router.use('/comments', require('./comments'));
router.use('/likes', require('./likes'));
router.use('/api', require('./api'));

// Exporting router which will be used in the entry point
module.exports = router;