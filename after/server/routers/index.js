'use strict';

const express = require('express');

const userRouter = require('./user.js');
const chatRouter = require('./chat.js');

const router = express.Router();

router.use('/users', userRouter);
router.use('/chats', chatRouter);

module.exports = router;
