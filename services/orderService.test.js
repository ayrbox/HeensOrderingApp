const { expect } = require('chai');
const {
  calculateItemTotal,
  getOrderItem,
  calculateOrderTotal,
  addOrderItem,
} = require('./orderService');

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

describe('#calculateOrderTotal', () => {
  it('get total of an order', () => {
    const expectedTotal = 100;
    const orderItems = [
      { itemTotal: 10 },
      { itemTotal: 20 },
      { itemTotal: 30 },
      { itemTotal: 40 },
    ];

    const orderTotal = calculateOrderTotal(orderItems);
    expect(orderTotal).to.equal(expectedTotal);
  });


  it('assumes item price to be zero if not supplied', () => {
    const expectedTotal = 10;
    const orderItems = [
      { itemTotal: 10 },
      { itemTotal: undefined },
      { }, // obect with out item total
    ];

    const orderTotal = calculateOrderTotal(orderItems);
    expect(orderTotal).to.equal(expectedTotal);
  });
});

describe('#addOrderItem', () => {
  it('error if order is null', () => {
    expect(() => addOrderItem(null, {})).to.throw();
  });

  it('error if order item is null', () => {
    expect(() => addOrderItem({}, null)).to.throw();
  });

  it('add order item to order object', () => {
    const order = { discount: 0, orderItems: [] };
    const newOrder = addOrderItem(order, item);
    const expectedOrder = {
      discount: 0,
      subTotal: 120,
      orderTotal: 120,
      orderItems: [{
        ...item,
        itemTotal: 120,
      }],
    };
    expect(newOrder).to.deep.equal(expectedOrder);
  });
});
