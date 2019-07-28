const keysProduction = require('./keys_prod');
const keysDevelopment = require('./keys_dev');
const keysTest = require('./keys_test');

if (process.env.NODE_ENV === 'production') {
  module.exports = keysProduction;
} else if (process.env.NODE_ENV === 'test') {
  module.exports = keysTest;
} else {
  module.exports = keysDevelopment;
}

console.log(`ENVIRONMENT: ${process.env.NODE_ENV}`); // eslint-disable-line
