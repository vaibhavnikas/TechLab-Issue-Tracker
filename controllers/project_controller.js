const Project = require('../models/project');
const Issue = require('../models/issue');

module.exports.createProjectForm = function(req, res){
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
    try{
        const project = await Project.findById(req.params.projectId).populate('issues');
    
        return res.render('project_issues',{
            title: "Tech Lab | Project Issues",
            project: project
        });
    }catch(err){
        console.log(`Error : ${err}`);
        return res.redirect('back');
    }
}

module.exports.createIssueForm = function(req,res){
    return res.render('create_issue',{
        title: 'Tech Lab | Create Issue',
        projectId: req.params.projectId
    });
}

module.exports.createIssue = async function(req, res){

    try{
        let project = await Project.findById(req.params.projectId);

        if(project){
            req.body.project = project;
            const issue = await Issue.create(req.body);

            await project.issues.push(issue);
            await project.save();

            return res.redirect(`/project/${project.id}`);
        }

        // cannot create issue for a project which doesn't exist.
        console.log('Unauthorized action');

        return res.redirect(`/project/${project.id}`);
    }catch(err){
        console.log(`Error : ${err}`);
        return res.redirect('back');
    }
}