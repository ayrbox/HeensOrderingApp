const bcrypt = require("bcryptjs");
const token = require("jsonwebtoken");
const secretKey = require("../../../config/keys").secretKey;

const User = require("../../../models/User");

module.exports = (req, res) => {
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
};
