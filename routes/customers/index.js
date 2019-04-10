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
  handler: getCustomers,
}, {
  method: 'get',
  path: `${defaultPath}/:id`,
  handler: getCustomer,
}, {
  method: 'post',
  path: defaultPath,
  handler: createCustomer,
}, {
  method: 'put',
  path: `${defaultPath}/:id`,
  handler: updateCustomer,
}, {
  method: 'delete',
  path: `${defaultPath}/:id`,
  handler: deleteCustomer,
}];

module.exports = routes;
