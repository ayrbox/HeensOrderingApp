const { expect } = require('chai');
const sinon = require('sinon');

const customerModel = require('../../models/customerModel');
const { validateCustomer } = require('../../validation/customerValidation');
const customerHandlers = require('./customers');


const sampleCustomers = [{
  name: 'Test Customer',
  phoneNo: '02383983929823',
  address: 'Test Raod',
  postCode: 'SE1 9AB',
}, {
  name: 'Hello Customer',
  phoneNo: '0238389237493',
  address: 'Hello Raod',
  postCode: 'AB20 1SS',
}];

let res;
let find;
let findOne;
let save;
let findOneAndUpdate;
let findOneAndRemove;

const handlers = customerHandlers(customerModel, validateCustomer);

describe('#test customer handlers', () => {
  beforeEach(() => {
    find = sinon.stub(customerModel, 'find');
    findOne = sinon.stub(customerModel, 'findOne');
    save = sinon.stub(customerModel.prototype, 'save');
    findOneAndUpdate = sinon.stub(customerModel, 'findOneAndUpdate');
    findOneAndRemove = sinon.stub(customerModel, 'findOneAndRemove');
    res = {
      status: sinon.spy(),
      send: sinon.spy(),
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

  describe('#get customers', () => {
    it('should return 404 with error', async () => {
      find.returns(Promise.resolve([]));
      await handlers.getCustomers({}, res);

      expect(res.status.calledWith(404)).to.equal(true);
    });

    it('should return customer list', async () => {
      find.returns(Promise.resolve(sampleCustomers));
      await handlers.getCustomers({}, res);

      expect(res.json.calledWith(sampleCustomers)).to.equal(true);
    });
  });


  describe('#get customer', () => {
    it('should return 404', async () => {
      findOne.returns(Promise.resolve(undefined));
      await handlers.getCustomer({ params: { id: 100 } }, res);

      expect(res.status.calledWith(404)).to.equal(true);
    });

    it('should return 500', async () => {
      findOne.returns(Promise.reject(Error('Unexpected error')));

      await handlers.getCustomer({ params: { id: 100 } }, res);

      expect(res.status.calledWith(500)).to.equal(true);
      expect(res.json.calledWith({ msg: 'Unable to get customer' })).to.equal(true);
    });

    it('should return sample customer', async () => {
      findOne.returns(Promise.resolve(sampleCustomers[0]));

      await handlers.getCustomer({ params: { id: 100 } }, res);
      expect(res.json.calledWith(sampleCustomers[0])).to.equal(true);
    });
  });

  describe('#create customer', () => {
    it('should return 400 for empty', async () => {
      save.returns(Promise.resolve({}));

      await handlers.createCustomer({ body: {} }, res);

      expect(res.status.calledWith(400)).to.equal(true);
      sinon.assert.calledWith(res.json, sinon.match.object);
    });

    it('should return 400 for invalid data', async () => {
      save.returns(Promise.resolve({}));

      await handlers.createCustomer({
        body: {
          name: 'Test Customer',
          phoneNo: '02383983929823',
          address: 'Test Raod',
          postCode: undefined,
        },
      }, res);

      expect(res.status.calledWith(400)).to.equal(true);
      sinon.assert.calledWith(res.json, sinon.match.object);
    });

    it('should return 500 on unexpected error', async () => {
      const [customer] = sampleCustomers;
      save.returns(Promise.reject(Error('Unexpected error')));

      await handlers.createCustomer({ body: customer }, res);

      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, sinon.match.instanceOf(Error));
    });

    it('should save data without error', async () => {
      const [customer] = sampleCustomers;
      save.returns(Promise.resolve(customer));

      await handlers.createCustomer({
        body: customer,
      }, res);

      sinon.assert.calledWith(res.json, sinon.match(customer)); // returns customer object
    });
  });

  describe('#update customer', () => {
    const [updateCustomer, updatedCustomer] = sampleCustomers;
    const updateReq = {
      params: { id: 200 },
      body: updateCustomer,
    };

    it('should return 404 on non existing user', async () => {
      findOne.returns(Promise.resolve(undefined));
      await handlers.updateCustomer(updateReq, res);

      sinon.assert.calledWith(res.status, 404);
    });

    it('should return 400 on empty object', async () => {
      findOne.returns(Promise.resolve(updateCustomer));
      await handlers.updateCustomer({ ...updateReq, body: {} }, res);

      sinon.assert.calledWith(res.status, 400);
    });

    it('should return 400 on invalid data', async () => {
      findOne.returns(Promise.resolve(updateCustomer));
      await handlers.updateCustomer({
        ...updateReq,
        body: {
          name: 'Only name is not allowed',
        },
      }, res);

      sinon.assert.calledWith(res.status, 400);
    });

    it('should return 500 on unexpected error on update', async () => {
      findOne.returns(Promise.resolve({}));
      findOneAndUpdate.returns(Promise.reject(Error('Unexpected error')));

      await handlers.updateCustomer(updateReq, res);

      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, sinon.match.instanceOf(Error));
    });

    it('should update data without error', async () => {
      findOne.returns(Promise.resolve({}));
      findOneAndUpdate.returns(Promise.resolve(updatedCustomer));

      await handlers.updateCustomer(updateReq, res);
      sinon.assert.calledWith(res.json, sinon.match(updatedCustomer));
    });
  });

  describe('#delete customers', () => {
    const [customerToDelete] = sampleCustomers;
    const deleteReq = {
      params: {
        id: 3883,
      },
    };

    it('should return 404 on customer not found', async () => {
      findOne.returns(Promise.resolve(undefined));
      await handlers.deleteCustomer(deleteReq, res);

      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, sinon.match({ msg: 'Customer not found' }));
    });

    it('should return 500 on unable to read customer', async () => {
      findOne.returns(Promise.reject(Error('Unexpected Error')));

      await handlers.deleteCustomer(deleteReq, res);

      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, sinon.match({ msg: 'Unexpected error' }));
    });

    it('should return 500 on unable to remove', async () => {
      findOne.returns(Promise.resolve({}));
      findOneAndRemove.returns(Promise.reject(Error('Unexpected Error')));

      await handlers.deleteCustomer(deleteReq, res);

      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, sinon.match({ msg: 'Unable to delete customer' }));
    });

    it('should remove customer without error', async () => {
      findOne.returns(Promise.resolve({}));
      findOneAndRemove.returns(Promise.resolve(customerToDelete));

      await handlers.deleteCustomer(deleteReq, res);
      sinon.assert.calledWith(res.json, sinon.match({ msg: 'Customer Removed' }));
    });
  });
});
