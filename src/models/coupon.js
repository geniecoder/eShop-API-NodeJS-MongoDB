const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: String,
  discount_percent: Number,
  valid_from: Date,
  valid_until: Date,
  usage_limit: Number,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
