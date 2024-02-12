const express = require('express');
const router = express.Router();
const ShippingMethodController = require('../controllers/shippingMethodController');

router.get('/', ShippingMethodController.getAllShippingMethods);
router.get('/:id', ShippingMethodController.getShippingMethodById);
router.post('/', ShippingMethodController.createShippingMethod);
router.put('/:id', ShippingMethodController.updateShippingMethod);
router.delete('/:id', ShippingMethodController.deleteShippingMethod);

module.exports = router;
