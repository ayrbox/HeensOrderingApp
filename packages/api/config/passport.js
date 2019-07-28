const strategy = require('passport-jwt').Strategy;
const extract = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

const User = mongoose.model('users');

const opts = {};
opts.jwtFromRequest = extract.fromAuthHeaderAsBearerToken();
opts.secretOrKey = require('../config/keys').secretKey;

module.exports = (passport) => {
  passport.use(
    new strategy(opts, (payload, done) => { // eslint-disable-line
      User.findById(payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err)); // eslint-disable-line
    }),
  );
};
