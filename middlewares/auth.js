const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/UserModel');

// Protect routes
const auth = async (req, res, next) => {
    const token = req.header('Authorization');
    // Check if not token
    if (!token) {
        return next(new ErrorResponse('Вы не авторизованы', 401));
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (err) {
        return next(new ErrorResponse('Вы не авторизованы', 401));
    }
};

module.exports = auth;