const { expect } = require('chai');
const { calculateItemTotal, getOrderItem } = require('./orderService');

const item = {
  name: 'Test OrderItem',
  price: 100,
  options: [{
    description: 'extra1',
    additionalCost: 10,
  }, {
    description: 'extra2',
    additionalCost: 10,
  }, {
    description: 'no cost add',
    additionalCost: 0,
  }],
};


// order types
// Order with one time (no options)
// Order with multiple items (no options)
// Order with one item and multiple options
// Order with multiple items and multiple options

describe('#calculateItemTotal', () => {
  it('should get total of order item', () => {
    const total = calculateItemTotal(item);
    expect(total).to.equal(120);
  });

  it('should throw an error', () => {
    expect(calculateItemTotal).to.throw();
  });
});


describe('#getOrderItem', () => {
  it('get order item with total', () => {
    const expected = {
      ...item,
      itemTotal: 120,
    };
    const orderItem = getOrderItem(item);
    expect(orderItem).to.deep.equal(expected);
  });
});
