const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  orderItems: {
    type: [{
      name: { type: String, required: true },
      description: { type: String },
      price: { type: Number, required: true },
      menuOptions: [
        {
          description: { type: String, required: true },
          additionalCost: { type: Number, required: true },
        },
      ],
      itemTotal: { type: Number, required: true },
    }],
    required: true,
  },
  subTotal: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  orderTotal: {
    type: Number,
    required: true,
  },
  orderType: {
    type: String,
    required: true,
    enumValues: ['delivery', 'collection', 'table'],
  },
  deliveryAddress: {
    type: {
      name: { type: String },
      contactNo: { type: String },
      address: { type: String },
      postCode: { type: String },
    },
    required: [
      () => this.orderType === 'delivery',
      'Delivery address is required for delivery order',
    ],
  },
  tableNo: {
    type: String,
    required: [
      () => this.orderType === 'table',
      'Table no. is required for table order',
    ],
  },
  note: { type: String },
  status: {
    type: String,
    required: true,
    enumValues: [
      'ordered',
      'paid',
      'processing',
      'delivered',
      'cancelled',
      'collected',
      'served',
    ],
    default: 'ordered',
  },
});

module.exports = mongoose.model('orders', OrderSchema);
