const Category = require("../models/category");

const CategoryController = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) throw Error("Category not found");
      res.json(category);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  createCategory: async (req, res) => {
    const { name, description, parent_category:parentCategoryId } = req.body;
    try {
      // Check if the parent category exists (if provided)
      if (parentCategoryId) {
        const parentCategory = await Category.findById(parentCategoryId);
        if (!parentCategory) {
          return res.status(404).json({ message: "Parent category not found" });
        }
      }

      // Create the new category
      const category = new Category({
        name,
        description,
        parent_category: parentCategoryId || null,
      });

      await category.save();
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedCategory) throw Error("Category not found");
      res.json(updatedCategory);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const deletedCategory = await Category.findByIdAndDelete(req.params.id);
      if (!deletedCategory) throw Error("Category not found");
      res.json(deletedCategory);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

module.exports = CategoryController;
