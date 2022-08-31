// mongodb configuration file setup with mongoose 

const mongoose = require('mongoose');
const env = require('./environment');

const mongodb_url = env.mongodb_url || `mongodb://localhost/${env.db}`;

mongoose.connect(mongodb_url, {
    family: 4,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB'));

db.on('open', function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;