const express = require('express');
const {
    followUser,
    unfollow
} = require('../controllers/followController');
const updateLastSeen = require('../middlewares/updateLastSeen');
const router = express.Router();
const auth = require('../middlewares/auth');

router.post('/:userId', auth, updateLastSeen, followUser);
router.delete('/:userId', auth, updateLastSeen, unfollow);

module.exports = router;
