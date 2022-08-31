const Project = require('../models/project');

module.exports.home = async function(req, res){
    
    try{
        const projects = await Project.find();

        return res.render('home', {
            title: "TechLab | Home",
            projects: projects
        });

    }catch(err){
        console.log(`Error : ${err}`);
        req.flash('error',"Unknown Error");
        return res.redirect('back');
    }
}