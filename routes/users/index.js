const userModel = require('../../models/user');
const {
  validateRegistration,
  validateLogin,
} = require('../../validation/userValidation');

const { secretKey } = require('../../config/keys');
const userHandlers = require('./users');

const {
  login,
  registration,
} = userHandlers(userModel, {
  validateLogin,
  validateRegistration,
}, secretKey);

module.exports = [{
  method: 'post',
  path: '/api/users/login',
  handler: login,
  excludeAuthentication: true,
}, {
  method: 'post',
  path: '/api/users/register',
  handler: registration,
  excludeAuthentication: true,
}];
