const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

dbLink = 'mongodb://127.0.0.1/codeial_development';

mongoose.connect(dbLink);

const db = mongoose.connection;
db.dbLink = dbLink;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', function(){
    console.log(`Connceted to Database :: MongoDB on ${dbLink}`);
});

module.exports = db;