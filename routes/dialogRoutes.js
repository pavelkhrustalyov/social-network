const express = require('express');
const {
    createDialog,
    getDialogs,
    createMessage,
    getMessages
  } = require('../controllers/dialogController');
const updateLastSeen = require('../middlewares/updateLastSeen');

const router = express.Router();
const auth = require('../middlewares/auth');

router.post('/create/:partnerId', auth, updateLastSeen, createDialog);
router.get('/', auth, updateLastSeen, getDialogs);
router.post('/create-message/:dialogId', auth, updateLastSeen, createMessage);
router.get('/messages/:dialogId', auth, updateLastSeen, getMessages);

module.exports = router;