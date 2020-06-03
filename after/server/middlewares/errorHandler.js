'use strict';

module.exports = (err, req, res, next) => {
  console.log(err);
  if (err.name === 'SequelizeValidationError') {
    err.code = 400;
    err.message = err.errors.map(error => {
      return error.message
    });
  }

  err.code = err.code || 500

  if (!err.path) {
    res.status(err.code).json({
      message: err.message
    });
  } else {
    res.status(err.code).json({
      message: err.message,
      path: err.path
    });
  }
}