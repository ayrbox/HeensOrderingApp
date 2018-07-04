const joi = require("joi");
const joiValidate = require("./joi-validate");

const loginSchema = joi.object().keys({
  email: joi
    .string()
    .email()
    .required(),
  password: joi.string().required()
});

const registrationSchema = joi.object().keys({
  name: joi
    .string()
    .regex(/^[A-z]+$/)
    .required()
    .label("Name of user"),
  email: joi
    .string()
    .required()
    .email(),
  password: joi
    .string()
    .alphanum()
    .min(8)
    .required()
});

module.exports = {
  validateRegistration: (data, cb) => joiValidate(registrationSchema, data, cb),
  validateLogin: (data, cb) => joiValidate(loginSchema, data, cb)
};
