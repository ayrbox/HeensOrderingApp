const { expect } = require('chai');
const mongoose = require('mongoose');
const User = require('./user');

describe('#userModel', () => {
  after((done) => {
    mongoose.models = {};
    mongoose.modelSchemas = {};
    done();
  });

  it('Invalid: if require fields are null', (done) => {
    new User().validate(({ errors }) => {
      expect(errors.password).to.exist;
      expect(errors.email).to.exist;
      done();
    });
  });
});
