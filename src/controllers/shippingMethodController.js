const ShippingMethod = require('../models/shippingMethod');

const ShippingMethodController = {
  getAllShippingMethods: async (req, res) => {
    try {
      const shippingMethods = await ShippingMethod.find();
      res.json(shippingMethods);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getShippingMethodById: async (req, res) => {
    try {
      const shippingMethod = await ShippingMethod.findById(req.params.id);
      if (!shippingMethod) throw Error('Shipping method not found');
      res.json(shippingMethod);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  createShippingMethod: async (req, res) => {
    const shippingMethod = new ShippingMethod(req.body);
    try {
      const newShippingMethod = await shippingMethod.save();
      res.status(201).json(newShippingMethod);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateShippingMethod: async (req, res) => {
    try {
      const updatedShippingMethod = await ShippingMethod.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedShippingMethod) throw Error('Shipping method not found');
      res.json(updatedShippingMethod);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  deleteShippingMethod: async (req, res) => {
    try {
      const deletedShippingMethod = await ShippingMethod.findByIdAndDelete(req.params.id);
      if (!deletedShippingMethod) throw Error('Shipping method not found');
      res.json(deletedShippingMethod);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
};

module.exports = ShippingMethodController;