const joi = require('joi');
const joiValidation = require('./joi-validate');
const isEmpty = require('./is-empty');

const orderItemSchema = joi.object().keys({
  name: joi.string().required(),
  price: joi.number().required(),
  description: joi.string(),
  menuOptions: joi.array(),
  itemTotal: joi.number().required(),
});

const orderItemOptionSchema = joi.object().keys({
  description: joi.string().required(),
  additionalCost: joi.number().required(),
});

const deliveryAddressSchema = joi.object().keys({
  name: joi.string().required(),
  contactNo: joi.string().required(),
  address: joi.string().required(),
  postCode: joi.string().required(),
});

module.exports = {
  validateOrder: (data) => {
    if (!data.orderItems || !Array.isArray(data.orderItems) || !data.orderItems.length) {
      return {
        isValid: false,
        errors: {
          orderItems: 'Order item(s) are empty or invalid',
        },
      };
    }

    const orderItemErrors = data.orderItems.reduce(
      (itemErrors, orderItem, index) => {
        // validate a item in orderItems
        const { errors, isValid } = joiValidation(orderItemSchema, orderItem);
        if (!isValid) {
          itemErrors.push({ [index]: errors });
        }
        // validate order options
        const optionErrors = (orderItem.options || []).reduce(
          (optionError, o, i) => {
            const { err, isValidOrder } = joiValidation(
              orderItemOptionSchema,
              o,
            );
            if (!isValidOrder) {
              optionError.push({ [i]: err });
            }
            return optionError;
          },
          [],
        );
        if (!isEmpty(optionErrors)) {
          itemErrors.push({ [index]: 'Invalid order options' });
        }

        return itemErrors;
      },
      [],
    );

    if (!isEmpty(orderItemErrors)) {
      return {
        isValid: false,
        errors: {
          orderItems: 'Invalid order items(s)',
          detail: orderItemErrors,
        },
      };
    }

    return {
      isValid: true,
      errors: {},
    };
  },
  validateDeliveryAddress: data => joiValidation(deliveryAddressSchema, data),
  validateOrderItem: data => joiValidation(orderItemSchema, data),
};
