const express = require('express');

const {
    me,
    getUser,
    getUsers,
    editUser,
    avatarUpload,
    uploadUserAvatar,
    resizeAvatar
  } = require('../controllers/userController');


const { check } = require('express-validator');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/:id', auth, getUser);
router.get('/user/me', auth, me);
router.post('/user/edit', auth, 
  [
    check('firstName', 'Имя обязательно').not().isEmpty().trim(),
    check('secondName', 'Фамилия обязательна').not().isEmpty().trim()
  ], editUser);

router.get('/user/:username', auth, getUsers);

router.put('/user/avatar-upload', auth, uploadUserAvatar, resizeAvatar, avatarUpload);

module.exports = router;