const express = require('express');
const { getFeed } = require('../controllers/feedController');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/', auth, getFeed);

module.exports = router;