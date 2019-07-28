const jsonwebtoken = require('jsonwebtoken');
const { secretKey } = require('../../../config/keys');

const makeAuth = userId => (request) => {
  const validToken = jsonwebtoken.sign({
    id: userId,
    name: 'Test User Name',
  }, secretKey, { expiresIn: 3600 });

  return request
    .set({ Authorization: `Bearer ${validToken}` });
};

module.exports = {
  makeAuth,
};
