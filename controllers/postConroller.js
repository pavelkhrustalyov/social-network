const User = require('../models/UserModel');
const Post = require('../models/PostModel');
const Comment = require('../models/CommentModel');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');

const multerStorage = multer.memoryStorage()

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new ErrorResponse('Неверный формат изображения!', 400), false);
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadPostImg = upload.single('postImg');

exports.resizePostImg = async (req, res, next) => {
    if (!req.file) return next();
    req.file.filename = `post_${req.user._id}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
    .resize(600, 700, { fit: 'inside', withoutEnlargement: true })
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`${process.env.PATH_UPLOAD_POST}/${req.file.filename}`);
    next();
};

const ErrorResponse = require('../utils/errorResponse');

exports.postCreate = async (req, res, next) => {
    const { text } = req.body;

    try {
        let filename = req.file ? req.file.filename : null;
       
        const user = await User.findById(req.user.id);
        if (!user) {
            return next(new ErrorResponse('Вы не авторизованы!', 401));
        }
        const post = await Post.create(
            { user: req.user.id, text, postImg: filename }
        );
        user.posts.unshift(post._id);
        await post.populate({ path: 'user', select: 'fullName avatar' })
            .execPopulate();
        await post.save();
        await user.save();
        res.status(200).json(post);
        io.emit('POST_CREATE', post);
    } catch (error) {
        console.log(error)
        next(error);
    }
};

exports.postDelete = async (req, res, next) => {
    const { postId } = req.params;
    try {
        const post = await Post.findOne({ _id: postId, user: req.user.id });
        if (!post) {
            return next(new ErrorResponse('Вы не можете удалить чужой пост!'), 400);
        }
        if (post.postImg) {
            fs.unlink(`${process.env.PATH_UPLOAD_POST}/${post.postImg}`, (err) => {
                if (err) console.error(err);
            });
        }
   
        await Comment.deleteMany({ postId: postId });
        await post.remove();
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};

exports.postLikes = async (req, res, next) => {
    const { postId } = req.params;
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return next(new errorResponse('Вы не авторизованы', 401));
        }
        const post = await Post.findById(postId);
        if (!post) {
            return next(new errorResponse('Пост не существует', 404));
        }
        const likeExist = post.likes.findIndex(post => (
            post.toString() === req.user.id)
        );
        if (likeExist !== -1) {
            post.likes.splice(likeExist, 1);
        } else {
            post.likes.push(req.user.id);
        }
        await post.populate('likes', 'fullName avatar')
            .execPopulate();
        await post.save();
        res.status(201).json(post.likes);
    } catch (error) {
        next(error);
    }
};