const sinon = require('sinon');

const orderModel = require('../../models/orderModel');
const {
  validateOrder,
  validateDeliveryAddress,
  validateOrderItem,
} = require('../../validation/orderValidation');

const orderHandlers = require('./order');

const sampleOrders = [{
  date: new Date(),
  orderItems: [{
    name: 'Test Item',
    description: 'Test Item Description',
    price: 100,
    menuOptions: [],
    itemTotal: 100,
  }],
  subTotal: 100,
  discount: 0,
  orderTotal: 100,
  orderType: 'delivery', // collection, table
  deliveryAddress: {
    name: 'Test Person',
    contactNo: '0202 28238 283',
    address: 'Test Road, London',
    postCode: 'TE51 0AB',
  },
  status: 'ordered',
}, {
  date: new Date(),
  orderItems: [],
  subTotal: 100,
  discount: 10,
  orderTotal: 90,
  orderType: 'collection',
  note: '20 mins',
  status: 'collected',
}, {
  date: new Date(),
  orderItems: [],
  subTotal: 100,
  discount: 0,
  orderTotal: 100,
  orderType: 'table',
  tableNo: 'T101',
  status: 'served',
}];

let res;
let find;
let findOne;
let save;
let findOneAndUpdate;
let findOneAndRemove;


const handlers = orderHandlers(orderModel, {
  validateOrder,
  validateOrderItem,
  validateDeliveryAddress,
});

describe('#test order route handlers', () => {
  beforeEach(() => {
    find = sinon.stub(orderModel, 'find');
    findOne = sinon.stub(orderModel, 'findOne');
    save = sinon.stub(orderModel.prototype, 'save');
    findOneAndUpdate = sinon.stub(orderModel, 'findOneAndUpdate');
    findOneAndRemove = sinon.stub(orderModel, 'findOneAndRemove');

    res = {
      status: sinon.spy(),
      json: sinon.spy(),
    };
  });

  afterEach(() => {
    find.restore();
    findOne.restore();
    save.restore();
    findOneAndUpdate.restore();
    findOneAndRemove.restore();
  });


  describe('#get orders', () => {
    it('should return 404 with error', async () => {
      find.returns({
        sort: sinon.stub().resolves([]),
      });
      await handlers.getOrders(undefined, res);

      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, sinon.match({
        msg: 'No orders were found',
      }));
    });

    it('should return order list ', async () => {
      find.returns({
        sort: sinon.stub().resolves(sampleOrders),
      });
      await handlers.getOrders(undefined, res);
      sinon.assert.calledWith(res.json, sampleOrders);
    });
  });


  describe('#get order', () => {
    const getReq = {
      params: { id: 100 },
    };

    it('should return 404', async () => {
      findOne.resolves(undefined);
      await handlers.getOrder(getReq, res);

      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, sinon.match({
        msg: 'Order not found',
      }));
    });

    it('should return order', async () => {
      const [order] = sampleOrders;
      findOne.resolves(order);

      await handlers.getOrder(getReq, res);

      sinon.assert.notCalled(res.status);
      sinon.assert.calledWith(res.json, sinon.match(order));
    });
  });

  describe('#create order', async () => {
    const [order, invalidOrder] = sampleOrders;

    it('should return 400 for empty object', async () => {
      save.resolves({});
      await handlers.createOrder({ body: invalidOrder }, res);

      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, sinon.match.object);
    });

    it('should return 400 for invalid data', async () => {
      save.resolves({});
      await handlers.createOrder({ body: {} }, res);

      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, sinon.match.object);
    });

    it('should return 500 for unexpected error', async () => {
      save.rejects(Error('Unexpected error'));

      await handlers.createOrder({ body: order }, res);

      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, sinon.match.instanceOf(Error));
    });


    it('should save data without error', async () => {
      save.resolves(order);

      await handlers.createOrder({
        body: order,
      }, res);

      sinon.assert.calledWith(res.json, sinon.match(o => o === order));
    });
  });


  describe('#update order status', () => {
    const [order] = sampleOrders;
    const updateReq = {
      params: { id: 400 },
      body: order,
    };

    it('should return 404 on non existing menu', async () => {
      findOne.resolves(undefined);
      await handlers.updateOrderStatus(updateReq, res);

      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, sinon.match({ msg: 'Order not found' }));
    });

    it('should return 500 on unexpected error on udpate', async () => {
      findOne.rejects(Error('Unexpected Error'));

      await handlers.updateOrderStatus(updateReq, res);

      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, sinon.match.instanceOf(Error));
    });

    it('should update menu without error', async () => {
      findOne.resolves({
        ...order,
        save: () => Promise.resolve({ ...order, status: 'paid' }),
      });

      await handlers.updateOrderStatus({
        params: { id: 100 },
        body: { status: 'paid' },
      }, res);
      sinon.assert.calledWith(res.json, sinon.match({
        ...order,
        status: 'paid',
      }));
    });
  });

  describe('#delete order', () => {
    const [orderToDelete] = sampleOrders;
    const deleteReq = {
      params: {
        id: 4080,
      },
    };

    it('should return 404 on menu not found', async () => {
      findOne.resolves(undefined);

      await handlers.deleteOrder(deleteReq, res);
      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, sinon.match({ msg: 'Order not found' }));
    });

    it('should return 500 on unable to read menu', async () => {
      findOne.rejects(Error('Unexpected error'));

      await handlers.deleteOrder(deleteReq, res);

      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, sinon.match.instanceOf(Error));
    });

    it('should return 500 on unable to remove', async () => {
      findOne.resolves({});
      findOneAndRemove.rejects(Error('Unexpected Error'));

      await handlers.deleteOrder(deleteReq, res);
      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, sinon.match.instanceOf(Error));
    });


    it('should remove menu without error', async () => {
      findOne.resolves({});
      findOneAndRemove.resolves(orderToDelete);

      await handlers.deleteOrder(deleteReq, res);

      sinon.assert.calledWith(res.json, sinon.match({ msg: 'Order deleted' }));
    });
  });
});
