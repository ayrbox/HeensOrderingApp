const mongoose = require('mongoose');

const { Schema } = mongoose;

const menuSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'categories',
  },
  tags: {
    type: [String],
  },
  menuOptions: [
    {
      description: {
        type: String,
        required: true,
      },
      additionalCost: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  ],
});

module.exports = mongoose.model('menus', menuSchema);
