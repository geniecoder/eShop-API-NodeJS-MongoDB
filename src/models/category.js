const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add the Category name"],
    unique: [true, "Duplicate Category name"], 
  },
  description: String,
  parent_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
