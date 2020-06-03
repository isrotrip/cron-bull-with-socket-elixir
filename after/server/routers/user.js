'use strict';

const express = require('express');

const authenticate = require('../middlewares/authenticate.js');
const UserController = require('../controllers/user.js');


const router = express.Router();

router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.post('/authenticate', authenticate, UserController.authenticate);
router.patch('/premium', authenticate, UserController.premium);

module.exports = router;
