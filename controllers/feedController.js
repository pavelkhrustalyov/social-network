const Post = require('../models/PostModel');

exports.getFeed = async (req, res, next) => {
    try {
        const posts = await Post.find({
            user: { $in: req.user.signed }
        })
        .populate('user', 'fullName avatar last_seen')
        .populate('likes', 'fullName avatar last_seen')
        .populate(
            { path: 'comments', populate: [
                { path: 'author', select: 'fullName avatar last_seen' }
            ]})
        .sort({ createdAt: -1 })
        .exec();
        res.status(200).json(posts);
    } catch (err) {
        next(err);
    }
};