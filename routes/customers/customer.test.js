const { expect } = require('chai');
const sinon = require('sinon');

const customerModel = require('../../models/customerModel');
const customerHandlers = require('./customers');

const res = {
  status: sinon.spy(),
  send: sinon.spy(),
  json: sinon.spy(),
};

const sampleCustomers = [
  { name: 'test', description: 'askdfljasldfas' },
  { name: 'hello', description: 'hellaskdfjla' },
];

let find;
let findOne;


const handlers = customerHandlers(customerModel);

describe('#test customer handlers', () => {
  before(() => {
    find = sinon.stub(customerModel, 'find');
    findOne = sinon.stub(customerModel, 'findOne');
  });

  after(() => {
    find.restore();
    findOne.restore();
  });

  describe('#get categories', () => {
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
      handlers.getCustomer({ params: { id: 100 } }, res);

      expect(res.status.calledWith(404)).to.equal(true);
    });

    it('should return 500', async () => {
      findOne.returns(Promise.reject(new Error('failed')));
      await handlers.getCustomer({ params: { id: 100 } }, res);
      // console.log(res)

      expect(res.status.calledWith(500)).to.equal(true);
      expect(res.json.calledWith({ msg: 'Unable to get customer' })).to.equal(true);
    });

    it('should return sample customer', async () => {
      findOne.returns(Promise.resolve(sampleCustomers[0]));

      await handlers.getCustomer({ params: { id: 100 } }, res);
      expect(res.json.calledWith(sampleCustomers[0])).to.equal(true);
    });
  });
});
