const express = require('express');
const router = express.Router();
const PaymentMethodController = require('../controllers/paymentMethodController');

router.get('/', PaymentMethodController.getAllPaymentMethods);
router.get('/:id', PaymentMethodController.getPaymentMethodById);
router.post('/', PaymentMethodController.createPaymentMethod);
router.put('/:id', PaymentMethodController.updatePaymentMethod);
router.delete('/:id', PaymentMethodController.deletePaymentMethod);

module.exports = router;
