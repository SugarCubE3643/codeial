// require() reads a JavaScript file, executes it, and then proceeds to return the export object
// by exporting the objects it allows to add modules

// Imports express module
const express = require('express');

// Makes an express app
const app = express();

// We use either port 8000 or 8080 for development purpose 
// For production we usually use port 80
const port = 8000;

// `` (backticks) along with ${} notation allows us to put variables between string
// This technique is called interpolation

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