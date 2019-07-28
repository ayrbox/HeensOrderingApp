const { expect } = require('chai');
const { validateMenu, validateOption } = require('./menuValidation');

describe('#menuValidation', () => {
  it('invalid empty object', () => {
    const { errors, isValid } = validateMenu({});
    expect(isValid).to.equal(false);
    expect(errors.name).to.exist;
    expect(errors.description).to.exist;
    expect(errors.price).to.exist;
    expect(errors.category).to.exist;
  });

  it('invalid if no name', () => {
    const { errors, isValid } = validateMenu({
      description: 'Menu Item description',
      price: 10,
      category: 'cateogryids',
    });
    expect(isValid).to.equal(false);
    expect(errors.name).to.exist;
  });

  it('invalid if price is not number', () => {
    const { errors, isValid } = validateMenu({
      name: 'menu Name',
      description: 'menu description',
      price: '£10.20pence',
      catgory: 'category_id',
    });
    expect(isValid).to.equal(false);
    expect(errors.price).to.exist;
  });

  it('should valid menu item', () => {
    const { errors, isValid } = validateMenu({
      name: 'Menu Item Name',
      description: 'Menu description',
      price: 6.45,
      category: '293847293749237492374',
    });
    expect(isValid).to.equal(true);
    expect(errors).to.deep.equal({});
  });
});


describe('#optionValidation', () => {
  it('should invalidate empty object', () => {
    const { errors, isValid } = validateOption({});
    expect(isValid).to.equal(false);
    expect(errors.description).to.exist;
    expect(errors.additionalCost).to.exist;
  });

  it('should invalid if description is empty', () => {
    const { errors, isValid } = validateOption({
      additionalCost: 20,
    });
    expect(isValid).to.equal(false);
    expect(errors.description).to.exist;
  });

  it('should invalid if additional cost is empty', () => {
    const { errors, isValid } = validateOption({
      description: 'option description',
    });
    expect(isValid).to.equal(false);
    expect(errors.additionalCost).to.exist;
  });

  it('should invalidate if additional cost is no number', () => {
    const { errors, isValid } = validateOption({
      description: 'option desc',
      additionalCost: '£10',
    });
    expect(isValid).to.equal(false);
    expect(errors.additionalCost).to.exist;
  });
});
