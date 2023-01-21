const User = require('../models/user');

// For loading the profile page of the user
module.exports.profile = function(req, res){

    User.findById(req.params.id, function(err, user){
        return res.render('profile', {
            title: "User",
            profile_user: user
        });
    });    
}


module.exports.update = function(req, res){

    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }

}

// For rendering sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
} 

// For rendering sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
}

// For Creating a new user using sign-up post request
module.exports.createUser = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('Error in finding user in database during sign up'); return res.redirect('back');}

        if(!user){
            User.create(req.body, function(err, user){
                if(err){console.log('Error in creating user in database during sign up'); return res.redirect('back');}

                return res.redirect('/users/sign-in');
            });
        }

        return res.redirect('back');
    });
}

// For logging in the user using sign-in post request
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res, next){
    req.logout(function(err){
        if(err){
            return next(err);
        }
        return res.redirect('/users/sign-in');
    });
}