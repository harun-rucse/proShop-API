const mongoose = require('mongoose');
const Product = require('./product');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty']
    },
    rating: {
      type: Number,
      min: [1, 'Rating must be greater than or equal to 1'],
      max: [5, 'Rating must be less than or equal to 5']
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Review must be belongs to user']
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Review must be belongs to product']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
  }
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

reviewSchema.statics.calcAverageRatings = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { product: productId }
    },
    {
      $group: {
        _id: '$product',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingQty: stats[0].nRating,
      ratingAvg: stats[0].avgRating
    });
  } else {
    await Tour.findByIdAndUpdate(productId, {
      ratingQty: 0,
      ratingAvg: 4.5
    });
  }
};

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name email'
  });
  next();
});

reviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.product);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.review = await this.findOne();

  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.review.constructor.calcAverageRatings(this.review.tour);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
