const Post = require('../models/post');
const User = require('../models/user');

module.exports.feed = function(req, res){

    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user',
        }
    })
    .exec(function(err, posts){
        if(err){console.log(`Error in finding posts: ${err}`); return res.end();}

        User.find({}, function(err, users){
            return res.render('feed', {
                title: "Feed Page",
                posts: posts,
                all_users: users
            });
        });
    });    
};