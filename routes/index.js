// when a new instance of express is called it actually is an instance being passed on after it's called for the first time
const express = require('express');

// Creating express router
const router = express.Router();

// exporting home controller funcitons
const homeController = require('../controllers/home_controller');

console.log('Roter is loader');

// This is the router which calls a particular action(function) from the controller
router.get('/', homeController.home);

// Exporting router which will be used in the entry point
module.exports = router;