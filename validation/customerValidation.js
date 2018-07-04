const joi = require("joi");
const joiValidation = require("./joi-validate");

const customerSchema = joi.object().keys({
  name: joi.string().required(),
  phoneNo: joi.number().required(),
  address: joi.string().required(),
  postCode: joi.string().required(),
  note: joi.string()
});

module.exports = {
  validateCustomer: data => joiValidation(customerSchema, data)
};
