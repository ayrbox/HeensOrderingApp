const { expect } = require('chai');
const { validateCategory } = require('./categoryValidation');

describe('#categoryValidation', () => {
  it('invalid empty object', () => {
    const { errors, isValid } = validateCategory({});
    expect(isValid).to.equal(false);
    expect(errors.name).to.exist;
    expect(errors.description).to.exist;
  });

  it('invalidate object without name', () => {
    const { errors, isValid } = validateCategory({
      description: 'Category description',
    });

    expect(isValid).to.equal(false);
    expect(errors.name).to.exist;
    expect(errors.description).to.not.exist;
  });

  it('invalidate object without description', () => {
    const { errors, isValid } = validateCategory({
      name: 'Category Name',
    });

    expect(isValid).to.equal(false);
    expect(errors.name).to.not.exist;
    expect(errors.description).to.exist;
  });
});
