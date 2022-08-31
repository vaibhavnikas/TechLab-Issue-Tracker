const User = require('../models/user');

// function to display sign in form
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('back');
    }

    return res.render('sign_in', {
        title: 'TechLab | Sign In'
    });
}

// function to display sign up form
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('back');
    }

    return res.render('sign_up', {
        title: 'TechLab | Sign Up'
    });
}

// function to create new account
module.exports.create = async function(req, res){
    try{
        if(req.body.password != req.body.confirm_password){
            req.flash('error', "Password and Confirm Password didn't match");
            return res.redirect('back');
        }
    
        let user = await User.findOne({email : req.body.email});

        if(!user){
            user = await User.create(req.body);

            req.flash('success', 'Account created successfully');
            return res.redirect('/users/sign-in');
        }else{
            req.flash('error', "An account with this email already exists");
            res.redirect('back');
        }
    }catch(err){
        console.log('Error',err);
        req.flash('error',"Unknown Error");
        return res.redirect('back');
    }
}

// redirecting after session is created
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged In Successfully');
    return res.redirect('/');
}

// function to sign-out the user
module.exports.destroySession = function(req, res){
    req.logout(function(user, err){
        if(err) return next(err);

        req.flash('success', 'You have been logged out');
        return res.redirect('/users/sign-in');
    });
}