const ErrorResponse = require('../utils/errorResponse');
const Post = require('../models/PostModel');
const Comment = require('../models/CommentModel');

exports.commentCreate = async (req, res, next) => {
    const { postId } = req.params;
    const { text } = req.body;

    try {
        const post = await Post.findOne({ _id: postId });

        if (!post) {
            return next(new ErrorResponse('Пост не найден!', 404));
        }
        
        const comment = await Comment.create({
            postId,
            text,
            author: req.user.id
        });

        post.comments.push(comment._id);
        await comment.populate('author', 'fullName avatar')
            .execPopulate();
        await comment.save();
        await post.save();
        res.status(201).json(comment);
    } catch (error) {
        next(error);
    }
};

exports.deleteComment = async (req, res, next) => {
    const { commentId } = req.params;
    try {
         
        const comment = await Comment.findOne(
            { _id: commentId, author: req.user._id }
        );
        if (!comment) {
            return next(new ErrorResponse('Комментарий не найден!', 404));
        }
        
        await comment.remove();
        res.status(204).json();
        
    } catch (error) {
        next(error);
    }
};
