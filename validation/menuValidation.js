const joi = require('joi');
const joiValidate = require('./joi-validate');

const MenuSchema = joi.object().keys({
  name: joi.string().required(),
  description: joi.string().required(),
  price: joi.number().required(),
  category: joi.string().required(),
  tags: joi.string(),
});

const menuOptionSchema = joi.object().keys({
  description: joi.string().required(),
  additionalCost: joi.number().required(),
});

module.exports = {
  validateMenu: data => joiValidate(MenuSchema, data),
  validateOption: data => joiValidate(menuOptionSchema, data),
};
