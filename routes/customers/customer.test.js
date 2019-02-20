const { expect } = require('chai');
const sinon = require('sinon');

const customerModel = require('../../models/customerModel');
const customerHandlers = require('./customers');

const resSpy = {
  status: sinon.spy(),
  send: sinon.spy(),
  json: sinon.spy(),
};

describe('#test customer handlers', () => {
  it('should return 404 with error', async () => {
    const find = sinon.stub(customerModel, 'find');
    find.returns(Promise.resolve([]));

    const handler = customerHandlers(customerModel);
    await handler.getCustomers({}, resSpy);
    // console.log('TEST value', resSpy);

    expect(resSpy.status.calledWith(404)).to.equal(true);
    sinon.assert.calledOnce(find);
    find.restore();
  });
});
