'use strict';

const { User } = require('../models');
const jwt = require('../helpers/jwt.js');
const customError = require('../helpers/customError.js');
const { INVALID_TOKEN_ERROR } = require('../statics/error.js');

module.exports = (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    next(customError(INVALID_TOKEN_ERROR));
  } else {
    try {
      const { id, username, premium } = jwt.verify(token);

      User
        .findOne({
          where: {
            id,
            username,
            premium
          }
        })
        .then(user => {
          if (!user) {
            throw customError(INVALID_TOKEN_ERROR);
          } else {
            req.userLogin = {
              id: user.id,
              username: user.username,
              premium: user.premium
            };

            next();
          }
        })
        .catch(next);
    } catch (err) {
      next(customError(INVALID_TOKEN_ERROR));
    }
  }
}