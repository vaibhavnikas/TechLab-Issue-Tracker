const User = require('../models/user');

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('back');
    }

    return res.render('sign_in', {
        title: 'TechLab | Sign In'
    });
}

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('back');
    }

    return res.render('sign_up', {
        title: 'TechLab | Sign Up'
    });
}

module.exports.create = async function(req, res){
    try{
        if(req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }
    
        let user = await User.findOne({email : req.body.email});

        if(!user){
            user = await User.create(req.body);

            return res.redirect('/users/sign-in');
        }else{
            res.redirect('back');
        }
    }catch(err){
        console.log('Error',err);
        return;
    }
}

module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout(function(user, err){
        if(err) return next(err);

        return res.redirect('/users/sign-in');
    });
}