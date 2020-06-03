'use strict';

const express = require('express');

const ChatController = require('../controllers/chat.js');
const authenticate = require('../middlewares/authenticate.js');

const router = express.Router();

router.post('/', authenticate, ChatController.create);

module.exports = router;
