const mongoose = require('mongoose');

const shippingMethodSchema = new mongoose.Schema({
  name: String,
  description: String,
  cost: Number,
  estimated_delivery_time: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const ShippingMethod = mongoose.model('ShippingMethod', shippingMethodSchema);

module.exports = ShippingMethod;
