const Order = require('../models/order');
const factory = require('./handlerFactory');

/**
 * @desc    Get All orders
 * @route   GET /api/orders
 * @access  Private (admin)
 */
exports.getAllOrder = factory.getAll(Order);

/**
 * @desc    Get single order
 * @route   GET /api/orders
 * @access  Private
 */
exports.getOrder = factory.getOne(Order);

/**
 * @desc    Create new order
 * @route   POST /api/orders
 * @access  Private
 */
exports.createOrder = factory.createOne(Order);

/**
 * @desc    Update a order
 * @route   PATCH /api/orders
 * @access  Private
 */
exports.updateOrder = factory.updateOne(Order);

/**
 * @desc    Delete a order
 * @route   DELETE /api/orders
 * @access  Private
 */
exports.deleteOrder = factory.deleteOne(Order);
