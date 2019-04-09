const customerModel = require('../../models/customerModel');
const { validateCustomer } = require('../../validation/customerValidation');
const customerHandlers = require('./customers');

const {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = customerHandlers(customerModel, validateCustomer);

const defaultPath = '/api/customers';
const routes = [{
  method: 'get',
  path: defaultPath,
  authenticate: true,
  handler: getCustomers,
}, {
  method: 'get',
  path: `${defaultPath}/:id`,
  authenticate: true,
  handler: getCustomer,
}, {
  method: 'post',
  path: defaultPath,
  authenticate: true,
  handler: createCustomer,
}, {
  method: 'put',
  path: `${defaultPath}/:id`,
  authenticate: true,
  handler: updateCustomer,
}, {
  method: 'delete',
  path: `${defaultPath}/:id`,
  authenticate: true,
  handler: deleteCustomer,
}];

module.exports = routes;
