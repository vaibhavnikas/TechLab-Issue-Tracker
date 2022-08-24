const Project = require('../models/project');

module.exports.home = async function(req, res){
    
    try{
        const projects = await Project.find();

        return res.render('home', {
            title: "Tech Lab | Home",
            projects: projects
        });

    }catch(err){
        console.log(`Error : ${err}`);
        return;
    }
}