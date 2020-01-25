const express = require('express');
const {
    postCreate,
    postLikes,
    postDelete,
    uploadPostImg,
    resizePostImg
} = require('../controllers/postConroller');

const router = express.Router();
const auth = require('../middlewares/auth');
const updateLastSeen = require('../middlewares/updateLastSeen');

router.post('/post-create', auth, uploadPostImg, resizePostImg, updateLastSeen, postCreate);
router.patch('/:postId/likes', auth, updateLastSeen, postLikes);
router.delete('/:postId', auth, updateLastSeen, postDelete);

module.exports = router;
