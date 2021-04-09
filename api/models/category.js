const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required']
    },
    description: {
      type: String,
      required: [true, 'Category short description is required']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
  }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
