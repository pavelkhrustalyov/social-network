const User = require('../models/UserModel');
const ErrorResponse = require('../utils/errorResponse');
const { validationResult } = require('express-validator');
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

exports.uploadUserAvatar = upload.single('avatar');

exports.resizeAvatar = async (req, res, next) => {
    if (!req.file) return next();
    req.file.filename = `avatar_${req.user._id}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer).resize(300, 300)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`${process.env.PATH_UPLOAD_AVATAR}/${req.file.filename}`);
    next();
};

exports.avatarUpload = async (req, res, next) => {
    if (!req.file) {
        return next(new ErrorResponse('Выберите изображение', 400));
    }
    const filename = req.file.filename;
    const user = await User.findById(req.user.id);
    if (!user) {
        return next(new ErrorResponse('Пользователь не найден', 404));
    }
    if (user.avatar && user.avatar !== 'default.png') {
        fs.unlink(`${process.env.PATH_UPLOAD_AVATAR}/${user.avatar}`, 
        (err) => {
            if (err) console.error(err);
        });
    }

    user.avatar = filename;
    await user.save();
    res.json(filename);
};

exports.me = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
            .select('firstName secondName avatar birthday sex city about carpet last_seen');
        if (!user) {
            return next(new ErrorResponse('Вы не авторизованы', 401));
        }

        res.status(200).json(user);

    } catch (error) {
        next(error);
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
            .select('-password')
            .populate('followers', 'firstName fullName avatar last_seen')
            .populate('signed', 'firstName fullName avatar last_seen')
            .populate({
                path: 'posts', populate: [
                    { path: 'user', select: 'fullName avatar last_seen'},
                    { path: 'likes', select: 'fullName avatar last_seen'},
                    { path: 'comments', populate: [
                        { path: 'author', select: 'fullName avatar last_seen' }
                    ]}
                ]
            })
            .exec();

            if (!user) {
            return next(new ErrorResponse('Пользователь не существует', 404));
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

exports.getUsers = async (req, res, next) => {
    const { username } = req.params;
    if (!username) return;
    try {
        const users = await User.aggregate([
            { $project : { fullName: 1, avatar: 1 } },
            {
                $match: {
                fullName: {
                    $regex: username,
                    "$options": "i",
                    }
                },
            }
        ]);

        if (!users || users.length === 0) {
            return next(new ErrorResponse('Пользователей не найдено!', 404));
        }
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

exports.editUser = async (req, res, next) => {
    const { firstName, secondName, city, sex, birthday, about  } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
        const user = await User.findByIdAndUpdate(req.user.id,
            { firstName, secondName, city, sex, birthday, about },
            { new: true }
        );
        user.fullName = user.firstName + ' ' + user.secondName;

        if (!user) {
            return next(new ErrorResponse('Вы не авторизованы', 401));
        }

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

exports.getCarpets = (req, res, next) => {
    fs.readdir('public/uploads/carpets', function(err, items) {
        if (err) {
            console.error(err);
            return;
        }
        let filterArray = [];
        for (let i = 0; i < items.length; i++) {
            const ext = items[i].split('.')[1];
            if (ext === 'jpg' || ext === 'jpeg') {
                filterArray = [...filterArray, items[i]];
            }
        }
        res.status(200).json(filterArray);
    });
};

exports.setCarpets = async (req, res, next) => {
    const { carpet } = req.params;
    const user = await User.findOneAndUpdate(
        { _id: req.user.id },
        { carpet },
        { new: true }
    );

    if (!user) {
        return next(new ErrorResponse('Пользователь не найден!', 400));
    }

    await user.save();
    res.status(201).json(user.carpet);
};


