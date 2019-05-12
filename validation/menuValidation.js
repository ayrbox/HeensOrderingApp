const joi = require('joi');
const joiValidate = require('./joi-validate');

const menuOptionSchema = joi.object().keys({
  _id: joi.string(),
  description: joi.string().required(),
  additionalCost: joi.number().required(),
});

const MenuSchema = joi.object().keys({
  name: joi.string().required(),
  description: joi.string().required(),
  price: joi.number().required(),
  category: joi.string().required(),
  tags: joi.string(),
  menuOptions: joi.array().items(menuOptionSchema),
});


module.exports = {
  validateMenu: data => joiValidate(MenuSchema, data),
  validateOption: data => joiValidate(menuOptionSchema, data),
};
