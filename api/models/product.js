const mongoose = require('mongoose');
const config = require('../config');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required']
    },
    photo: {
      type: String,
      default: config.DEFAULT_PRODUCT_PHOTO
    },
    brand: {
      type: String,
      required: [true, 'Product brand is required']
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Product category is required']
    },
    description: {
      type: String,
      required: [true, 'Product description is required']
    },
    ratingQty: {
      type: Number,
      default: 0
    },
    ratingAvg: {
      type: Number,
      default: 4.5
    },
    price: {
      type: Number,
      required: [true, 'Product price is required']
    },
    countInStock: {
      type: Number,
      default: 1
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
  }
);

productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id'
});

productSchema.pre('save', function (next) {
  this.ratingQty = Number(this.ratingQty);
  this.ratingAvg = Number(this.ratingAvg);
  this.price = Number(this.price);
  this.countInStock = Number(this.countInStock);

  next();
});

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'category',
    select: 'name'
  });

  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
