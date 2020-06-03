'use strict';

const { User } = require('../models');
const customError = require('../helpers/customError');
const bcrypt = require('../helpers/bcrypt.js');
const jwt = require('../helpers/jwt');
const { INVALID_USERNAME_PASSWORD } = require('../statics/error.js');

class UserController {
  static login(req, res, next) {
    const {
      username = '',
      password = ''
    } = req.body;

    User
      .findOne({
        where: {
          username
        }
      })
      .then(user => {
        if (!user
          || !bcrypt.compare(password, user.password)
        ) {
          throw customError(INVALID_USERNAME_PASSWORD);
        } else {
          const token = jwt.sign({
            id: user.id,
            username: user.username,
            premium: user.premium
          });

          req.io.emit('user-login', {
            username: user.username
          });

          res.status(200).json({
            message: 'Login berhasil.',
            data: {
              username: user.username,
              premium: user.premium,
              token
            }
          });
        }
      })
      .catch(next);
  }

  static register(req, res, next) {
    const {
      username = '',
      password = ''
    } = req.body;

    User
      .create({
        username,
        password,
        premium: false
      })
      .then(user => {
        res.status(201).json({
          message: 'Register berhasil.',
          data: {
            username: user.username,
            premium: user.premium
          }
        });
      })
      .catch(next);
  }

  static authenticate(req, res, next) {
    res.status(200).json({
      data: {
        username: req.userLogin.username,
        premium: req.userLogin.premium
      }
    });
  }

  static premium(req, res, next) {
    User
      .update({
        id: req.userLogin.id,
        premium: true
      }, {
        where: {
          id: req.userLogin.id
        }
      })
      .then(_ => {
        res.status(200).json({
          message: 'Berhasil ubah akun menjadi premium.'
        });
      })
      .catch(next);
  }
}

module.exports = UserController;
