const express = require('express');

const {
    me,
    getUser,
    getUsers,
    editUser,
    avatarUpload,
    uploadUserAvatar,
    resizeAvatar,
    getCarpets,
    setCarpets
  } = require('../controllers/userController');


const { check } = require('express-validator');
const router = express.Router();
const auth = require('../middlewares/auth');
const updateLastSeen = require('../middlewares/updateLastSeen');

router.get('/:id', auth, updateLastSeen, getUser);
router.get('/user/me', auth, updateLastSeen, me);
router.post('/user/edit', auth, 
  [
    check('firstName', 'Имя обязательно').not().isEmpty().trim(),
    check('secondName', 'Фамилия обязательна').not().isEmpty().trim()
  ], updateLastSeen, editUser);

router.get('/user/:username', auth, updateLastSeen, getUsers);

router.put('/user/avatar-upload', auth, uploadUserAvatar, resizeAvatar, updateLastSeen, avatarUpload);
router.get('/carpets/all', auth, getCarpets);
router.put('/carpets/new/:carpet', auth, setCarpets);

module.exports = router;