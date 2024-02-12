const Coupon = require('../models/coupon');

const CouponController = {
  getAllCoupons: async (req, res) => {
    try {
      const coupons = await Coupon.find();
      res.json(coupons);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getCouponByCode: async (req, res) => {
    try {
      const coupon = await Coupon.findOne({ code: req.params.code });
      if (!coupon) throw Error('Coupon not found');
      res.json(coupon);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  createCoupon: async (req, res) => {
    const coupon = new Coupon(req.body);
    try {
      const newCoupon = await coupon.save();
      res.status(201).json(newCoupon);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateCoupon: async (req, res) => {
    try {
      const updatedCoupon = await Coupon.findOneAndUpdate(
        { code: req.params.code },
        req.body,
        { new: true }
      );
      if (!updatedCoupon) throw Error('Coupon not found');
      res.json(updatedCoupon);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  deleteCoupon: async (req, res) => {
    try {
      const deletedCoupon = await Coupon.findOneAndDelete({ code: req.params.code });
      if (!deletedCoupon) throw Error('Coupon not found');
      res.json(deletedCoupon);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
};

module.exports = CouponController;