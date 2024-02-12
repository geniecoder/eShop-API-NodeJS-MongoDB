const Transaction = require('../models/transaction');

const TransactionController = {
  getAllTransactions: async (req, res) => {
    try {
      const transactions = await Transaction.find();
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getTransactionById: async (req, res) => {
    try {
      const transaction = await Transaction.findById(req.params.id);
      if (!transaction) throw Error('Transaction not found');
      res.json(transaction);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  createTransaction: async (req, res) => {
    const transaction = new Transaction(req.body);
    try {
      const newTransaction = await transaction.save();
      res.status(201).json(newTransaction);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateTransaction: async (req, res) => {
    try {
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedTransaction) throw Error('Transaction not found');
      res.json(updatedTransaction);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  deleteTransaction: async (req, res) => {
    try {
      const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
      if (!deletedTransaction) throw Error('Transaction not found');
      res.json(deletedTransaction);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
};

module.exports = TransactionController;
