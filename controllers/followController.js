const User = require('../models/UserModel');

const ErrorResponse = require('../utils/errorResponse');

exports.followUser = async (req, res, next) => {
    const { userId } = req.params;
    let user = await User.find({ _id: userId })
        .populate('followers', 'firstName fullName avatar');

    let follower = await User.findById({ _id: req.user.id });

    const currentFollower = follower.signed.findIndex(user => (
        user._id.toString() === userId
    ));

    if (currentFollower !== -1) {
        return next(new ErrorResponse('Вы уже подписаны!', 400));
    }

    user = await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { followers: req.user.id }},
        { new: true }
    );

    follower = await User.findByIdAndUpdate(
        { _id: req.user.id },
        { $push: { signed: user._id }},
        { new: true }
    );

    await follower.save();
    await user.populate('followers', 'firstName fullName avatar').execPopulate();
    await user.save();
    res.status(201).json(user.followers);
};

exports.unfollow = async (req, res, next) => {
    const { userId } = req.params;

    const user = await User.findByIdAndUpdate(
        { _id: userId },
        { $pull: { followers: req.user.id }},
        { new: true }
    );

    const follower = await User.findByIdAndUpdate(
        { _id: req.user.id },
        { $pull: { signed: user._id }},
        { new: true }
    );
    
    await follower.save();
    await user.populate('followers', 'firstName fullName avatar')
        .execPopulate();
    await user.save();
    res.status(200).json(user.followers);
};