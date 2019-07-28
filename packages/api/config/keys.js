const keysProduction = require('./keys_prod');
const keysDevelopment = require('./keys_dev');
const keysTest = require('./keys_test');

const { NODE_ENV = 'development' } = process.env;

if (NODE_ENV === 'production') {
  module.exports = keysProduction;
} else if (NODE_ENV === 'test') {
  module.exports = keysTest;
} else {
  module.exports = keysDevelopment;
}

console.log(`ENVIRONMENT: ${NODE_ENV}`); // eslint-disable-line
