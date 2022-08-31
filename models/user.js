const mongoose = require('mongoose');

// defined userSchema
const userSchema = new mongoose.Schema({
    email: {
        type : String,
        required : true,
        unique: true
    },
    password: {
        type : String,
        required : true
    },
    name: {
        type : String,
        required : true
    }
},{
    timestamps : true
});

// created user model to store user info in database
const User = mongoose.model('User', userSchema);

// exported user model
module.exports = User;