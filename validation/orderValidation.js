const joi = require('joi');
const joiValidation = require('./joi-validate');
// const isEmpty = require('./is-empty');

const orderSchema = joi.object().keys({
  date: joi.date().required(),
  orderItems: joi.array().items(joi.object().keys({
    name: joi.string().required(),
    description: joi.string(),
    price: joi.number().required(),
    menuOptions: joi.array().items(joi.object().keys({
      description: joi.string().required(),
      additionalCost: joi.number().required(),
    })),
    itemTotal: joi.number().required(),
  })).min(1),
  subTotal: joi.number().required(),
  discount: joi.number().required(),
  orderTotal: joi.number().required(),
  orderType: joi.string().required(),
  deliveryAddress: joi.object().keys({
    name: joi.string().required(),
    contactNo: joi.string().required(),
    address: joi.string().required(),
    postCode: joi.string().required(),
  }).when('orderType', { is: 'delivery', then: joi.required() }),
  tableNo: joi.string(),
  note: joi.string(),
  status: joi.string().required(),
});

const orderItemSchema = joi.object().keys({
  name: joi.string().required(),
  price: joi.number().required(),
  description: joi.string(),
  menuOptions: joi.array(),
  itemTotal: joi.number().required(),
});

const deliveryAddressSchema = joi.object().keys({
  name: joi.string().required(),
  contactNo: joi.string().required(),
  address: joi.string().required(),
  postCode: joi.string().required(),
});

module.exports = {
  validateOrder: data => joiValidation(orderSchema, data),
  validateDeliveryAddress: data => joiValidation(deliveryAddressSchema, data),
  validateOrderItem: data => joiValidation(orderItemSchema, data),
};
