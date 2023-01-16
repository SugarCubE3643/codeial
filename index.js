// require() reads a JavaScript file, executes it, and then proceeds to return the export object
// by exporting the objects it allows to add modules

// `` (backticks) along with ${} notation allows us to put variables between string
// This technique is called interpolation

// Imports express module
const express = require('express');

// Makes an express app
const app = express();

const cookieParser = require('cookie-parser');
// We use either port 8000 or 8080 for development purpose 
// For production we usually use port 80
const port = 8000;

// Importing layouts
const expressLayouts = require('express-ejs-layouts');

// Importing mongoose config as db
const db = require('./config/mongoose');

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}));

// cookie-parser is a middleware which parses cookies attached to the client request object
app.use(cookieParser());

// Setting up static files
app.use(express.static('./assets'));

// We have to put the middleware before routes so that the views can follow the layouts
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Using express router
// It'll redirect all routes to the router folder's index file for further routing
// Express router is acting as a middleware
app.use('/', require('./routes'));

// Setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Binds and listens for connection on the specified host and port
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is up and running at port: ${port}`);
})