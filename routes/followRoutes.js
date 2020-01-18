const express = require('express');
const {
    followUser,
    unfollow
} = require('../controllers/followController');

const router = express.Router();
const auth = require('../middlewares/auth');

router.post('/:userId', auth, followUser);
router.delete('/:userId', auth, unfollow);

module.exports = router;
