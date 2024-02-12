const express = require('express');
const router = express.Router();
const CouponController = require('../controllers/couponController');

router.get('/', CouponController.getAllCoupons);
router.get('/:code', CouponController.getCouponByCode);
router.post('/', CouponController.createCoupon);
router.put('/:code', CouponController.updateCoupon);
router.delete('/:code', CouponController.deleteCoupon);

module.exports = router;
