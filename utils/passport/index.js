const passport = require('passport');

const secureRoute = () => passport.authenticate('jwt', { session: false });

module.exports = {
  secureRoute,
};
