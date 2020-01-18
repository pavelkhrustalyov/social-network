const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.register = async (req, res, next) => {
    const { email, firstName, secondName, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            return next(new ErrorResponse('Пользователь уже зарегистирован', 401));
        }

        const newPassword = await bcrypt.hash(password, 12);

        user = await User.create({
            email,
            firstName,
            secondName,
            password: newPassword
        });
        user.fullName = user.firstName + ' ' + user.secondName;

        await user.save();
        
        jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.EXPIRES_TOKEN },
            (err, token) => {
            if (err) throw err;
                res.status(200).json(token);
            }
        );
    
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return next(new ErrorResponse('Пользователя не существует', 401));
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return next(new ErrorResponse('Неверный логин или пароль', 401));
        }

        jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.EXPIRES_TOKEN },
            (err, token) => {
            if (err) throw err;
                res.status(200).json(token);
            }
        );

    } catch (error) {
        next(error);
    }
};