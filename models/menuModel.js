const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "categories"
  },
  tags: {
    type: [String]
  },
  menuOptions: [
    {
      description: {
        type: String,
        required: true
      },
      additionalCost: {
        type: Number,
        required: true,
        default: 0
      }
    }
  ]
});

module.exports = Menu = mongoose.model("menus", menuSchema);
