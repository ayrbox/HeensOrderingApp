const express = require('express');

const userRoutes = express.Router();

const bcrypt = require('bcryptjs');
const token = require('jsonwebtoken');
const passport = require('passport');

const {
  validateLogin,
  validateRegistration,
} = require('../../validation/userValidation');

// @application keys
const { secretKey } = require('../../config/keys');

// @model
const User = require('../../models/user');

// @route        POST api/users/login
// @desc         Login User
// @access       Public
// @return       JWT Token
userRoutes.post('/login', (req, res) => {
  const { email, password } = req.body;

  const { errors, isValid } = validateLogin(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  }

  User.find().then((users) => {
    console.log(JSON.stringify(users, null, 2));
  });

  User.findOne({ email }).then((user) => {
    if (!user) {
      errors.email = 'User not found.';
      res.status(404).json(errors);
    }

    const payload = {
      id: user.id,
      name: user.name,
    };

    bcrypt.compare(password, user.password).then((match) => {
      if (match) {
        token.sign(payload, secretKey, { expiresIn: 3600 }, (err, signedToken) => {
          res.json({
            success: true,
            token: `Bearer ${signedToken}`,
          });
        });
      } else {
        errors.password = 'Invalid password';
        res.status(400).json(errors);
      }
    });
  });
});

// @route        POST api/users/register
// @access       private
// @return       User
userRoutes.post(
  '/register',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRegistration(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        throw new Error('Email already exists');
      }

      const { name, email, password } = req.body;
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err; // unlikely to occurs

        bcrypt.hash(password, salt, (hashError, hash) => {
          if (hashError) throw hashError;
          new User({
            name,
            email,
            password: hash,
          }).save()
            .then(newUserCreated => res.json(newUserCreated))
            .catch(err => console.log(err)); // eslint-disable-line
          return res.status(200);
        });
      });
    });
  },
);

module.exports = userRoutes;
