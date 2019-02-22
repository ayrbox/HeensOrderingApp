const sinon = require('sinon');

const menuModel = require('../../models/menuModel');
const { validateMenu, validateOption } = require('../../validation/menuValidation');

// TODO:; create file 
const menuHandlers = require('./menu');

// const MenuSchema = joi.object().keys({
//   name: joi.string().required(),
//   description: joi.string().required(),
//   price: joi.number().required(),
//   category: joi.string().required(),
//   tags: joi.string(),
// });

// const menuOptionSchema = joi.object().keys({
//   description: joi.string().required(),
//   additionalCost: joi.number().required(),
// });

// TODO: user faker to generate sample data
const sampleMenus = [{
  name,
  description,
  price,
  category,
  tags
}];
