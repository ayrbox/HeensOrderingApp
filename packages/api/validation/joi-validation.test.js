const { expect } = require('chai');
const joi = require('joi');
const JoiValidate = require('./joi-validate');

const personSchema = joi.object().keys({
  name: joi.string().required(),
  address: joi.string().required(),
  phoneNo: joi.string(),
  age: joi.number(),
});

describe('#JoiValidation', () => {
  it('throw error if schema or object is missing', () => {
    expect(JoiValidate).to.throw();
  });

  it('should invalidate with errors', () => {
    const { isValid, errors } = JoiValidate(personSchema, {});
    expect(isValid).to.equal(false);
    expect(errors.name).to.exist;
    expect(errors.address).to.exist;
  });


  it('should be valid object', () => {
    const { isValid, errors } = JoiValidate(personSchema, {
      name: 'Test',
      address: 'London, UK',
    });
    expect(isValid).to.equal(true);
    expect(Object.keys(errors).length).to.equal(0);
  });


  it('should invalidate to expect number', () => {
    const { isValid, errors } = JoiValidate(personSchema, {
      name: 'Test',
      address: 'Test Road, London, UK',
      age: '1E', // 30 in Hex
    });

    expect(isValid).to.equal(false);
    expect(errors.age).to.exist;
  });
});
