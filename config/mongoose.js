const mongoose = require('mongoose');

const mongodb_url = 'mongodb://localhost/issue_tracker_development';

mongoose.connect(mongodb_url, {
    family: 4,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB'));

db.on('open', function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;