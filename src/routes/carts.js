const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');

router.get('/:user_id', CartController.getCartByUserId);
router.post('/', CartController.addToCart);
router.put('/:user_id/:id', CartController.updateCartItem);
router.delete('/:user_id/:id', CartController.removeFromCart);

module.exports = router;
