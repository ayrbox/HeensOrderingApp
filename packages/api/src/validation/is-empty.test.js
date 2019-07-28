const { expect } = require('chai');
const isEmpty = require('./is-empty');

describe('#isEmpty', () => {
  it('empty object to be true', () => {
    const empty = isEmpty({});
    expect(empty).to.equal(true);
  });

  it('null to be true', () => {
    expect(isEmpty(null)).to.equal(true);
  });

  it('undefined to be true', () => {
    expect(isEmpty(undefined)).to.equal(true);
    expect(isEmpty()).to.equal(true);
  });

  it('empty string to be true', () => {
    expect(isEmpty('')).to.equal(true);
  });

  it('whitespace to be true', () => {
    expect(isEmpty('   ')).to.equal(true);
  });

  it('tabs space to be true', () => {
    expect(isEmpty('      ')).to.equal(true);
  });

  it('empty array to be true', () => {
    expect(isEmpty([])).to.equal(true);
  });
});
