const User = require('../models/user');

// For loading the profile page of the user
module.exports.profile = function(req, res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(user){
                return res.render('profile', {
                    title: "User Profile",
                    userName: user.name,
                    userEmail: user.email
                });
            }
            return res.redirect('/users/sign-in');
        });
    }else{
        return res.redirect('/users/sign-in');
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

    // Checking if the password matches with confirm_password
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    // Finding the user in database
    User.findOne({email: req.body.email}, function(err, user){

        // Error in finding user in database
        if(err){console.log('Error in finding user in database during sign up'); return res.redirect('back');}

        // If user if not present create a new user
        if(!user){
            User.create(req.body, function(err, user){
                if(err){console.log('Error in creating user in database during sign up'); return res.redirect('back');}

                return res.redirect('/users/sign-in');
            });
        }else{
            return res.redirect('/users/sign-up');
        }
    });
}

// For logging in the user using sign-in post request
module.exports.createSession = function(req, res){
    // Steps to authenticate the user

    // Find the user
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('Error in finding user in database during sign in'); return res.redirect('back');}

        // Handling when user was found
        if(user){
            // Handling password which doesn't match with database password
            if(req.body.password != user.password){
                return res.redirect('back');
            }

            // Handling session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }

        // Handling user not found
        return res.redirect('back');
    })
}

// For logging out the user
module.exports.logout = function(req, res){
    if("user_id" in req.cookies){
        res.clearCookie("user_id");
    }
    return res.redirect('/users/sign-in');
}