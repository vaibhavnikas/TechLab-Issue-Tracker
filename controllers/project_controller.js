const Project = require('../models/project');
const Issue = require('../models/issue');

module.exports.displayCreateProjectForm = function(req, res){
    return res.render('create_project',{
        title: 'TechLab | Create Project'
    });
}

module.exports.create = async function(req, res){

    try{
        const project = await Project.create(req.body);

        return res.redirect('/');
    }catch(err){
        console.log(`Error : ${err}`);
        return;
    }
}

module.exports.projectIssues = async function(req, res){
    try{
        const project = await Project.findById(req.params.projectId).populate('issues');
    
        return res.render('project_issues',{
            title: "TechLab | Project Issues",
            project: project
        });
    }catch(err){
        console.log(`Error : ${err}`);
        return res.redirect('back');
    }
}

module.exports.delete = async function(req, res){
    
    await Project.findByIdAndDelete(req.params.projectId);

    await Issue.deleteMany({project : req.params.projectId});

    return res.redirect('back');
}

