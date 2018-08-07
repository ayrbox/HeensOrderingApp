const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  orderItems: [
    {
      name: { type: String, required: true },
      description: { type: String },
      price: { type: Number, required: true },
      menuOptions: [
        {
          description: { type: String, required: true },
          additionalCost: { type: Number, required: true }
        }
      ],
      itemTotal: { type: Number, required: true }
    }
  ],
  subTotal: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  orderTotal: {
    type: Number,
    required: true
  },
  orderType: {
    type: String,
    required: true,
    enumValues: ["delivery", "collection", "table"]
  },
  deliveryAddress: {
    name: { type: String },
    contactNo: { type: String },
    address: { type: String },
    postCode: { type: String }
  },
  tableNo: {
    type: String
  },
  note: { type: String },
  orderStatus: {
    type: String,
    required: true,
    enumValues: [
      "ordered",
      "paid",
      "processing",
      "delivered",
      "cancelled",
      "collected",
      "served"
    ],
    default: "ordered"
  }
});

module.exports = Order = mongoose.model("orders", OrderSchema);
