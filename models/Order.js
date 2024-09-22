const mongoose = require('mongoose');
const { Schema } = mongoose;

const neworder = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },


  products: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  orderDate: {
    type: Date, default: Date.now
  }
});

module.exports = mongoose.model('Order', neworder);
