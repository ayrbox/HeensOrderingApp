const { expect } = require('chai');
const mongoose = require('mongoose');
const Order = require('./orderModel');

describe('#orderModal', () => {
  after((done) => {
    mongoose.models = {};
    mongoose.modelSchemas = {};
    done();
  });

  it('Invalid: if require fields are null', (done) => {
    new Order().validate(({ errors }) => {
      expect(errors.orderType).to.exist;
      expect(errors.orderTotal).to.exist;
      expect(errors.discount).to.exist;
      expect(errors.subTotal).to.exist;
      done();
    });
  });
});
