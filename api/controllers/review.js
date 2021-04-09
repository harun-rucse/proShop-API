const Review = require('../models/review');
const factory = require('./handlerFactory');

/**
 * @desc    Get All reviews
 * @route   GET /api/reviews
 * @access  Public
 */
exports.getAllReview = factory.getAll(Review);

/**
 * @desc    Get single review
 * @route   GET /api/reviews
 * @access  Private
 */
exports.getReview = factory.getOne(Review);

/**
 * @desc    Create new review
 * @route   POST /api/reviews
 * @access  Private
 */
exports.createReview = factory.createOne(Review);

/**
 * @desc    Update a review
 * @route   PATCH /api/reviews
 * @access  Private
 */
exports.updateReview = factory.updateOne(Review);

/**
 * @desc    Delete a review
 * @route   DELETE /api/reviews
 * @access  Private
 */
exports.deleteReview = factory.deleteOne(Review);
