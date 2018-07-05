const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
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
      options: {
        type: [String]
      }
    }
  ]
});

module.exports = Menu = moongoose.module("menus", MenuSchema);
