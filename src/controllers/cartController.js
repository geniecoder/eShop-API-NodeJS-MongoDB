const Cart = require('../models/cart');

const CartController = {
  getCartByUserId: async (req, res) => {
    try {
      const cart = await Cart.findOne({ user_id: req.params.user_id });
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addToCart: async (req, res) => {
    try {
      const cart = await Cart.findOneAndUpdate(
        { user_id: req.body.user_id },
        { $push: { items: req.body.item } },
        { new: true, upsert: true }
      );
      res.json(cart);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateCartItem: async (req, res) => {
    try {
      const cart = await Cart.findOneAndUpdate(
        { user_id: req.params.user_id, 'items._id': req.params.id },
        { $set: { 'items.$.quantity': req.body.quantity } },
        { new: true }
      );
      res.json(cart);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  removeFromCart: async (req, res) => {
    try {
      const cart = await Cart.findOneAndUpdate(
        { user_id: req.params.user_id },
        { $pull: { items: { _id: req.params.id } } },
        { new: true }
      );
      res.json(cart);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = CartController;