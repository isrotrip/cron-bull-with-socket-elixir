'use strict';

class CustomError extends Error {
  constructor({ name, message, code }) {
    super(message || 'InternalServerError');
    this.name = name || 'NotDefinedError';
    this.code = code || 500;
  }
}

module.exports = ({ name, message, code }) => {
  return new CustomError({
    name, 
    message,
    code
  });
}