const Post = require('../models/post');

module.exports.feed = function(req, res){

    Post.find({}).populate('user').exec(function(err, posts){
        if(err){console.log(`Error in finding posts: ${err}`); return res.end();}

        return res.render('feed', {
            title: "Feed Page",
            posts: posts
        });
    });
    
};