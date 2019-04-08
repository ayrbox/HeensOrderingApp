const jsonwebtoken = require('jsonwebtoken');
const { secretKey } = require('../../config/keys');

const auth = () => (request) => {
  const validToken = jsonwebtoken.sign({
    id: '5c9f8c64cae7314e3b9441d8',
    name: 'Test User Name',
  }, secretKey, { expiresIn: 3600 });

  return request
    .set({ Authorization: `Bearer ${validToken}` });
};

module.exports = {
  auth,
};
