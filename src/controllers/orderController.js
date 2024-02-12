const Order = require('../models/order');

const OrderController = {
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) throw Error('Order not found');
      res.json(order);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  createOrder: async (req, res) => {
    const order = new Order(req.body);
    try {
      const newOrder = await order.save();
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateOrder: async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedOrder) throw Error('Order not found');
      res.json(updatedOrder);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const deletedOrder = await Order.findByIdAndDelete(req.params.id);
      if (!deletedOrder) throw Error('Order not found');
      res.json(deletedOrder);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
};

module.exports = OrderController;