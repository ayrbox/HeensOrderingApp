const { expect } = require('chai');
const {
  validateOrder,
  validateDeliveryAddress,
  validateOrderItem,
} = require('./orderValidation');

describe('#validateDeliveryAddress', () => {
  it('should invalidate empty object', () => {
    const { errors, isValid } = validateDeliveryAddress({});
    expect(isValid).to.equal(false);
    expect(errors.name).to.exist;
    expect(errors.contactNo).to.exist;
    expect(errors.address).to.exist;
    expect(errors.postCode).to.exist;
  });

  it('should validate order delivery addresss', () => {
    const { errors, isValid } = validateDeliveryAddress({
      name: 'food eater',
      address: 'Food Court',
      contactNo: '0783723383',
      postCode: '100',
    });

    expect(isValid).to.equal(true);
    expect(errors).to.deep.equal({});
  });
});

describe('#validateOrderItem', () => {
  it('should invalidate empty object', () => {
    const { errors, isValid } = validateOrderItem({});
    expect(isValid).to.equal(false);
    expect(errors.name).to.exist;
    expect(errors.price).to.exist;
    expect(errors.itemTotal).to.exist;
  });

  it('should invalidate menu options is not an arrray', () => {
    const { errors, isValid } = validateOrderItem({
      name: 'Item Name',
      price: 7.5,
      description: 'Tasty Item description',
      menuOptions: {
        description: 'add Sauce',
        additionalCost: 1,
      },
      itemTotal: 8.5,
    });
    expect(isValid).to.equal(false);
    expect(errors.menuOptions).to.exist;
  });

  it('should validateorder item', () => {
    const { errors, isValid } = validateOrderItem({
      name: 'Singaporean Noodes',
      description: 'Alwasy favourite',
      price: 6.45,
      menuOptions: [
        {
          description: 'Additional chilli oil',
          additionalCost: 0.5,
        },
      ],
      itemTotal: 6.95,
    });

    expect(isValid).to.equal(true);
    expect(errors).to.deep.equal({});
  });
});

describe('#validateOrder', () => {
  it('should invalidate empty object', () => {
    const { errors, isValid } = validateOrder({});
    expect(isValid).to.equal(false);
    expect(errors.orderItems).to.exist;
  });

  it('should invalidate order without items', () => {
    const { errors, isValid } = validateOrder({
      orderItems: [],
    });
    expect(isValid).to.equal(false);
    expect(errors.orderItems).to.exist;
  });

  it('should validate order', () => {
    const { errors, isValid } = validateOrder({
      orderItems: [{
        name: 'Test Order item',
        price: 10,
        description: 'Order item test',
        itemTotal: 10,
        menuOptions: [],
      }],
    });
    expect(isValid).to.equal(true);
    expect(errors).to.deep.equal({});
  });

  it('should invalidate order with invalid items', () => {
    const { errors, isValid } = validateOrder({
      orderItems: [{
        menuItemName: 'Test Order Item',
        price: 20,
      }],
    });

    expect(isValid).to.equal(false);
    expect(errors.orderItems).to.exist;
    expect(errors.detail.length).to.be.above(0);
  });
});
