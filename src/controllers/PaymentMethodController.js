const PaymentMethod = require('../models/paymentMethod');

const PaymentMethodController = {
  getAllPaymentMethods: async (req, res) => {
    try {
      const paymentMethods = await PaymentMethod.find();
      res.json(paymentMethods);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getPaymentMethodById: async (req, res) => {
    try {
      const paymentMethod = await PaymentMethod.findById(req.params.id);
      if (!paymentMethod) throw Error('Payment method not found');
      res.json(paymentMethod);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  createPaymentMethod: async (req, res) => {
    const paymentMethod = new PaymentMethod(req.body);
    try {
      const newPaymentMethod = await paymentMethod.save();
      res.status(201).json(newPaymentMethod);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updatePaymentMethod: async (req, res) => {
    try {
      const updatedPaymentMethod = await PaymentMethod.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedPaymentMethod) throw Error('Payment method not found');
      res.json(updatedPaymentMethod);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  deletePaymentMethod: async (req, res) => {
    try {
      const deletedPaymentMethod = await PaymentMethod.findByIdAndDelete(req.params.id);
      if (!deletedPaymentMethod) throw Error('Payment method not found');
      res.json(deletedPaymentMethod);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
};

module.exports = PaymentMethodController;
