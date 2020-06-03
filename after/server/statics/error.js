'use strict';

// List Error Code 400
const INVALID_USERNAME_PASSWORD = {
  name: 'BadRequestError',
  message: 'username/password wrong.',
  code: 400
}


// List Error Code 401
const INVALID_TOKEN_ERROR = {
  name: 'InvalidTokenError',
  message: 'Silahkan login kembali.',
  code: 401
};

module.exports = {
  INVALID_USERNAME_PASSWORD,
  INVALID_TOKEN_ERROR
};