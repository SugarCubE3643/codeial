const User = require('../models/user');
const fs = require('fs');


// For loading the profile page of the user
module.exports.profile = async function(req, res){

    try {
        let user = await User.findById(req.params.id);    
        return res.render('profile', {
            title: "User",
            profile_user: user
        });
    } catch (err) {
        console.log('Error', err);
        return res.redirect('back');
    }    
}


module.exports.update = async function(req, res){

    if(req.user.id == req.params.id){
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err) {
                
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){

                    if(fs.existsSync(__dirname + '/..' + user.avatar)){
                        fs.unlinkSync(__dirname + '/..' + user.avatar);
                    }

                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })
            
        } catch (err) {
            console.log('Error', err);
            return res.redirect('back');
        }
    }else{
        req.flash('error', 'Unauthorized');
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
module.exports.createUser = async function(req, res){

    try {
        if(req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }
    
        let user = await User.findOne({email: req.body.email});
    
        if(!user){
            await User.create(req.body);
            return res.redirect('/users/sign-in');
        }
        return res.redirect('back');
    } catch (err) {
        console.log('Error', err);
        return res.redirect('back');
    }
}

// For logging in the user using sign-in post request
module.exports.createSession = function(req, res){
    req.flash('success', 'You have successfully logged in');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res, next){
    req.logout(function(err){
        if(err){
            return next(err);
        }
        req.flash('success', 'You have logged out !');
        return res.redirect('/users/sign-in');
    });
}