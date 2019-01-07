const keysProduction = require('./keys_prod');
const keysDevelopment = require('./keys_dev');

if (process.env.NODE_ENV === 'production') {
  module.exports = keysProduction;
} else {
  module.exports = keysDevelopment;
}

console.log(`ENVIRONMENT: ${process.env.NODE_ENV}`); // eslint-disable-line
