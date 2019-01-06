const joi = require('joi');
const joiValidation = require('./joi-validate');

const categorySchema = joi.object().keys({
  name: joi.string().required(),
  description: joi.string().required(),
});

module.exports = {
  validateCategory: data => joiValidation(categorySchema, data),
};
