const { expect } = require('chai');
const mongoose = require('mongoose');
const Category = require('./categoryModel');

describe('#categoryModel', () => {
  after((done) => {
    mongoose.models = {};
    mongoose.modelSchemas = {};
    done();
  });

  it('should be invalid if name is empty', () => {
    const c = new Category();
    c.validate((err) => {
      expect(err.errors.name).to.exist;
      expect(err.errors.description).to.exist;
    });
  });

  it('should be invalid if description is empty', () => {
    const c = new Category({
      name: 'A Category Name',
    });
    c.validate((err) => {
      expect(err.errors.description).to.exist;
    });
  });
});
