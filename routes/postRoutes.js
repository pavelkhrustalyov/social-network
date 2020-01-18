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

router.post('/post-create', auth, uploadPostImg, resizePostImg, postCreate);
router.patch('/:postId/likes', auth, postLikes);
router.delete('/:postId', auth, postDelete);

module.exports = router;
