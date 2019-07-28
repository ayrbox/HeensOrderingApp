const { expect } = require('chai');
const mongoose = require('mongoose');
const Menu = require('./menuModel');

describe('#menuModal', () => {
  after((done) => {
    mongoose.models = {};
    mongoose.modelSchemas = {};
    done();
  });

  it('Invalid: if require fields are null', (done) => {
    const c = new Menu();
    c.validate(({ errors }) => {
      expect(errors.name).to.exist;
      expect(errors.price).to.exist;
      expect(errors.description).to.exist;
      done();
    });
  });
});
