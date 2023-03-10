const Post = require('../models/post');
const User = require('../models/user');

module.exports.feed = async function(req, res){

    try {
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user',
            },
            populate: {
                path: 'likes'
            }
        }).populate('comments')
        .populate('likes');

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