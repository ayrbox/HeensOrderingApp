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
      price: { type: Number, required: true },
      options: [
        {
          description: { type: String, required: true },
          addtionalCost: { type: Number, required: true }
        }
      ],
      itemTotal: { type: String, required: true }
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
    enumValues: ["delivery", "collection"]
  },
  deliveryAddress: {
    name: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true },
    postCode: { type: String, required: true }
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
      "collected"
    ],
    default: "ordered"
  }
});

module.exports = Order = mongoose.model("orders", OrderSchema);
