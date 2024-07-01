const express = require('express');
const router = express.Router();

// Import individual route files
const usersRouter = require('./users');
const productsRouter = require('./products');
const categoriesRouter = require('./categories');
const ordersRouter = require('./orders');
const reviewsRouter = require('./reviews');
const cartsRouter = require('./carts');
const couponsRouter = require('./coupons');
const shippingMethodsRouter = require('./shippingMethods');
const paymentMethodsRouter = require('./paymentMethods');
const transactionsRouter = require('./transactions');

// Define routes for each entity
router.use('/user', usersRouter);
router.use('/products', productsRouter);
router.use('/category', categoriesRouter);
router.use('/orders', ordersRouter);
router.use('/reviews', reviewsRouter);
router.use('/carts', cartsRouter);
router.use('/coupons', couponsRouter);
router.use('/shippingMethods', shippingMethodsRouter);
router.use('/paymentMethods', paymentMethodsRouter);
router.use('/transactions', transactionsRouter);

module.exports = router;
