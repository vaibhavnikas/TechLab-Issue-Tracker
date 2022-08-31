const Project = require('../models/project');
const Issue = require('../models/issue');

module.exports.create = async function(req, res){
    try{
        let project = await Project.findById(req.params.projectId);

        if(project){
            req.body.project = project;

            if(req.body.labels.length != 0){
                req.body.labels = req.body.labels.split(",");
            }else{
                req.body.labels = [];
            }
            
            const issue = await Issue.create(req.body);

            await project.issues.push(issue);
            await project.save();
            
            req.flash('success', 'Issue created successfully');
            return res.redirect(`/project/${project.id}`);
        }

        // cannot create issue for a project which doesn't exist.
        console.log('Unauthorized action');
        req.flash('error','Unauthorized action');
        return res.redirect(`/project/${project.id}`);
    }catch(err){
        console.log(`Error : ${err}`);
        req.flash('error',"Unknown Error");
        return res.redirect('back');
    }
}

module.exports.displayCreateIssueForm = async function(req,res){
    try{
        let project = await Project.findById(req.params.projectId);

        return res.render('create_issue',{
            title: 'TechLab | Create Issue',
            project: project
        });
    }catch(err){
        console.log(`Error : ${err}`);
        req.flash('error',"Unknown Error");
        return res.redirect('back');
    }
}

module.exports.search = async function(req, res){
    try{
        if(req.body.labels.length == 0){
            delete req.body.labels;
        }else{
            req.body.labels = req.body.labels.split(",");
        }
    
        let query = {};
        if(req.body.title){
            query.title = req.body.title;
        }
        if(req.body.author){
            query.author = req.body.author;
        }
        if(req.body.description){
            const str = req.body.description;
            const regex = new RegExp(str,'i');
            query.description = {$regex: regex};
        }
        if(req.body.labels){
            query.labels =  {$all: req.body.labels};
        }
    
        let issues = await Issue.find(query).populate('project');
        let issueList = [];
    
        for(issue of issues){
            if(issue.project.id == req.params.projectId){
                issueList.push(issue);
            }
        }
        
        let project = await Project.findById(req.params.projectId);
        project.issues = issueList;
    
        return res.render('project_issues',{
            title: `TechLab | Project Issues`,
            project: project
        });
    }catch(err){
        console.log(`Error : ${err}`);
        req.flash('error',"Unknown Error");
        return res.redirect('back');
    }
}

module.exports.delete = async function(req,res){
    try{
        let issue = await Issue.findById(req.params.issueId);
        let projectId = issue.project;
        issue.remove();
        let project = await Project.findByIdAndUpdate(projectId, {$pull:{issues: req.params.issueId}});

        req.flash('success', 'Issue deleted successfully');
        return res.redirect(`/project/${projectId}`);
    }catch(err){
        console.log(`Error : ${err}`);
        req.flash('error',"Unknown Error");
        return res.redirect('back');
    }
}