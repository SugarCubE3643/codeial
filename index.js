// require() reads a JavaScript file, executes it, and then proceeds to return the export object
// by exporting the objects it allows to add modules

// `` (backticks) along with ${} notation allows us to put variables between string
// This technique is called interpolation

// dotenv
require('dotenv').config();

// Imports express module
const express = require('express');

// Makes an express app
const app = express();

const passport = require('passport');
const bcrypt = require('bcrypt');
const session = require('express-session');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');

// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));


const cookieParser = require('cookie-parser');
// We use either port 8000 or 8080 for development purpose 
// For production we usually use port 80
const port = 8000;

// Importing layouts
const expressLayouts = require('express-ejs-layouts');

// Importing mongoose config as db
const db = require('./config/mongoose');

// 
const initialize = require('./config/passport-local-strategy')

initialize(passport, 
    email => users.find(user => user.email == email),
    id => users.find(user => user.id == id)
);


// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}));

// cookie-parser is a middleware which parses cookies attached to the client request object
app.use(cookieParser());

// 
app.use(session({
    name: 'codeial',
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl: db.dbLink,
            autoremove: 'disabled'
        },
        function(err){
            console.log(`Error in storing the session: ${err}`);
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMiddleware.setflash);

// Setting up static files
app.use(express.static('./assets'));
// make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

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