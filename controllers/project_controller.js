const Project = require('../models/project');

module.exports.project = function(req, res){
    return res.render('create_project',{
        title: 'Tech Lab | Create Project'
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
    const project = await Project.findById(req.params.id);

    return res.render('project_issues',{
        title: "Tech Lab | Project Issues",
        project: project
    });
}