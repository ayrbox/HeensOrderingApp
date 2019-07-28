const orderModel = require('../../models/orderModel');
const { validateOrder } = require('../../validation/orderValidation');


const orderHandlers = require('./order');

const {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} = orderHandlers(orderModel, { validateOrder });

const orderPath = '/api/orders';

module.exports = [{
  method: 'get',
  path: orderPath,
  handler: getOrders,
}, {
  method: 'get',
  path: `${orderPath}/:id`,
  handler: getOrder,
}, {
  method: 'post',
  path: orderPath,
  handler: createOrder,
}, {
  method: 'put',
  path: `${orderPath}/:id`,
  handler: updateOrderStatus,
}, {
  method: 'delete',
  path: `${orderPath}/:id`,
  handler: deleteOrder,
}];
