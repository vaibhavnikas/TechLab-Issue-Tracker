const mongoose = require('mongoose');

// defined projectSchema
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    issues: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Issue'
        }
    ]
},{
    timestamps: true
});

// created project model to store projects in database
const Project = mongoose.model('Project', projectSchema);

// exported project model
module.exports = Project;