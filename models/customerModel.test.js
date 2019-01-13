const { expect } = require('chai');
const mongoose = require('mongoose');
const Customer = require('./customerModel');

describe('#customerModal', () => {
  after((done) => {
    mongoose.models = {};
    mongoose.modelSchemas = {};
    done();
  });

  it('Invalid: if require fields are null', (done) => {
    const c = new Customer();
    c.validate(({ errors }) => {
      expect(errors.name).to.exist;
      expect(errors.phoneNo).to.exist;
      expect(errors.address).to.exist;
      expect(errors.postCode).to.exist;
      expect(errors.note).to.not.exist;
      expect(errors.registeredDate).to.not.exist;
      done();
    });
  });
});
