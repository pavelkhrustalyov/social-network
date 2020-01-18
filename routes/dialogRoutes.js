const express = require('express');
const {
    createDialog,
    getDialogs,
    createMessage,
    getMessages
  } = require('../controllers/dialogController');

const router = express.Router();
const auth = require('../middlewares/auth');

router.post('/create/:partnerId', auth, createDialog);
router.get('/', auth, getDialogs);
router.post('/create-message/:dialogId', auth, createMessage);
router.get('/messages/:dialogId', auth, getMessages);

module.exports = router;