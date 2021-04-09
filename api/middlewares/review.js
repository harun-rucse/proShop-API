const Review = require('../models/review');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.checkUserAccessible = catchAsync(async (req, res, next) => {
  if (req.user.role === 'admin') return next();

  const currentReview = await Review.findById(req.params.id);
  if (currentReview && req.user._id !== currentReview.user) {
    return next(new AppError('You cannot modify this review', 403));
  }

  next();
});
