const Product = require('../models/product');
const factory = require('./handlerFactory');

/**
 * @desc    Get All products
 * @route   GET /api/products
 * @access  Public
 */
exports.getAllProduct = factory.getAll(Product);

/**
 * @desc    Get single product
 * @route   GET /api/products
 * @access  Public
 */
exports.getProduct = factory.getOne(Product);

/**
 * @desc    Create new product
 * @route   POST /api/products
 * @access  Private (admin)
 */
exports.createProduct = factory.createOne(Product);

/**
 * @desc    Update a product
 * @route   PATCH /api/products
 * @access  Private (admin)
 */
exports.updateProduct = factory.updateOne(Product);

/**
 * @desc    Delete a product
 * @route   DELETE /api/products
 * @access  Private (admin)
 */
exports.deleteProduct = factory.deleteOne(Product);
