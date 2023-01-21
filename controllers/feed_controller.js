const Post = require('../models/post');
const User = require('../models/user');

module.exports.feed = async function(req, res){

    try {
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user',
            }
        });

        let users = await User.find({});

        return res.render('feed', {
            title: "Feed Page",
            posts: posts,
            all_users: users
        });

    } catch (err) {
        console.log('Error', err);
        return;
    }

        
};