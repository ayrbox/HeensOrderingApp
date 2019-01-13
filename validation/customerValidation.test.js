const { expect } = require('chai');
const { validateCustomer } = require('./customerValidation')



// const joi = require('joi');
// const joiValidation = require('./joi-validate');

// const customerSchema = joi.object().keys({
//   name: joi.string().required(),
//   phoneNo: joi.number().required(),
//   address: joi.string().required(),
//   postCode: joi.string().required(),
//   note: joi.string(),
// });

// module.exports = {
//   validateCustomer: data => joiValidation(customerSchema, data),
// };
describe('#customerValidation', () => {
  it('invalid empty object', () => {
    const { errors, isValid } = validateCustomer({});
    expect(isValid).to.equal(false);
    expect(errors.name).to.exist;
    expect(errors.phoneNo).to.exist;
    expect(errors.address).to.exist;
    expect(errors.postCode).to.exist;
    expect(errors.note).to.not.exist;
  });

  it('invalid if no name', () => {
    const { errors, isValid } = validateCustomer({
      phoneNo: '20374238742',
      address: 'Test address',
      postCode: 'SE1 2AA',
      note: 'Test Note',
    });
    expect(isValid).to.equal(false);
    expect(errors.name).to.exist;
  });

  it('invalid if no phonenumber', () => {
    const { errors, isValid } = validateCustomer({
      name: 'Test Name',
      address: 'Test address',
      postCode: 'SE1 2AA',
      note: 'Test Note',
    });
    expect(isValid).to.equal(false);
    expect(errors.phoneNo).to.exist;
  });
});
