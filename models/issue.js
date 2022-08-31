const mongoose = require('mongoose');

// defined issueSchema
const issueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    labels : [
        {
            type: String
        }
    ]
},{
    timestamps: true
});

// created issue model to store issues in database
const Issue = mongoose.model('Issue', issueSchema);

// exported issue model
module.exports = Issue;