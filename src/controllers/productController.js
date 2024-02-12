const Product = require("../models/product");

const ProductController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) throw Error("Product not found");
      res.json(product);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  createProduct: async (req, res) => {
    const product = new Product(req.body);
    try {
      const newProduct = await product.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedProduct) throw Error("Product not found");
      res.json(updatedProduct);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
      // If product is deleted successfully
      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        statusCode: 200,
        deletedProduct: deletedProduct,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

module.exports = ProductController;
