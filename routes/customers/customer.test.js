const { expect } = require('chai');
const sinon = require('sinon');

const customerModel = require('../../models/customerModel');
const customerHandlers = require('./customers');

// let throwError = false
const resSpy = {
  status: sinon.spy(),
  send: sinon.spy(),
  json: sinon.spy(),
};
// const CustomerMock = function () {
//   find: () => {
//   }
// };

describe('#test customer handlers', () => {
  it('should return 404 with error', async () => {
    const spy = sinon.spy(customerModel, 'find');

    const handler = customerHandlers(customerModel);
    await handler.getCustomers({}, resSpy);

    expect(resSpy.status.calledWith(404)).to.equal(true);

    spy.restore();
  });
});
