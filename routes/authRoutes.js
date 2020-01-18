const express = require('express');
const { register, login } = require('../controllers/authController');
const { check } = require('express-validator');
const router = express.Router();

router.post('/register', [
    check('email', 'Пожалуйста, введите корректный Email').isEmail().normalizeEmail(),
    check('password', 'Пароль обязателен. Минимум 6 символов').isLength({ min: 6 }).trim(),
    check('firstName', 'Имя обязательно').not().isEmpty().trim(),
    check('secondName', 'Фамилия обязательна').not().isEmpty().trim(),
], register);
router.post('/login', [
    check('email', 'Пожалуйста, введите корректный Email').isEmail().normalizeEmail(),
    check('password', 'Пароль обязателен. Минимум 6 символов').isLength({ min: 6 }).trim()
], login);

module.exports = router;