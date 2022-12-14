const Project = require('../models/project');
const Issue = require('../models/issue');

// function to display create project form
module.exports.displayCreateProjectForm = function(req, res){
    return res.render('create_project',{
        title: 'TechLab | Create Project'
    });
}

// function to create project
module.exports.create = async function(req, res){

    try{
        const project = await Project.create(req.body);

        req.flash('success', 'Project created successfully');
        return res.redirect('/');
    }catch(err){
        console.log(`Error : ${err}`);
        req.flash('error',"Unknown Error");
        return res.redirect('back');
    }
}

// function to display project issues
module.exports.projectIssues = async function(req, res){
    try{
        const project = await Project.findById(req.params.projectId).populate('issues');
    
        return res.render('project_issues',{
            title: "TechLab | Project Issues",
            project: project
        });
    }catch(err){
        console.log(`Error : ${err}`);
        req.flash('error',"Unknown Error");
        return res.redirect('back');
    }
}

// function to delete project
module.exports.delete = async function(req, res){
    
    try{

        await Project.findByIdAndDelete(req.params.projectId);
        await Issue.deleteMany({project : req.params.projectId});

        req.flash('success', 'Project deleted successfully');
        return res.redirect('back');
    }catch(err){
        console.log(`Error : ${err}`);
        req.flash('error',"Unknown Error");
        return res.redirect('back');
    }
}

