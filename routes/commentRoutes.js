const express = require('express');
const {
    commentCreate,
    deleteComment
} = require('../controllers/commentController');

const router = express.Router();
const auth = require('../middlewares/auth');

router.post('/create-comment/:postId', auth, commentCreate);
router.delete('/delete-comment/:commentId', auth, deleteComment);

module.exports = router;
