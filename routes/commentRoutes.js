const express = require('express');
const {
    commentCreate,
    deleteComment
} = require('../controllers/commentController');
const updateLastSeen = require('../middlewares/updateLastSeen');
const router = express.Router();
const auth = require('../middlewares/auth');

router.post('/create-comment/:postId', auth, updateLastSeen, commentCreate);
router.delete('/delete-comment/:commentId', auth, updateLastSeen, deleteComment);

module.exports = router;
