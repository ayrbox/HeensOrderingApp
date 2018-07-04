const express = require("express");
const userRoutes = express.Router();

const bcrypt = require("bcryptjs");
const token = require("jsonwebtoken");
const passport = require("passport");

const {
  validateLogin,
  validateRegistration
} = require("../../validation/userValidation");

//@application keys
const secretKey = require("../../config/keys").secretKey;

//@model
const User = require("../../models/user");

//@route        POST api/users/login
//@desc         Login User
//@access       Public
//@return       JWT Token
userRoutes.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = {}; //TODO Validate login model

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found.";
      return res.status(404).json(errors);
    }

    const payload = {
      id: user.id,
      name: user.name
    };

    bcrypt.compare(password, user.password).then(match => {
      if (match) {
        token.sign(payload, secretKey, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: `Bearer ${token}`
          });
        });
      } else {
        errors.password = "Invalid password";
        return res.status(400).json(errors);
      }
    });
  });
});

//@route        POST api/users/register
//@access       Public
//@return       User
userRoutes.post("/register", (req, res) => {
  const { errors, isValid } = validateRegistration(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err; //unlikely to occurs

        bcrypt.hash(newUser.password, salt, (hashError, hash) => {
          if (hashError) throw hashError;

          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = userRoutes;
