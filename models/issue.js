const mongoose = require('mongoose');

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

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;