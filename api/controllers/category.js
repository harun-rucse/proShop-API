const Category = require('../models/category');
const factory = require('./handlerFactory');

/**
 * @desc    Get All category
 * @route   GET /api/categories
 * @access  Public
 */
exports.getAllCategory = factory.getAll(Category);

/**
 * @desc    Get single category
 * @route   GET /api/categories/id
 * @access  Public
 */
exports.getCategory = factory.getOne(Category);

/**
 * @desc    Create new category
 * @route   POST /api/categories
 * @access  Private (admin)
 */
exports.createCategory = factory.createOne(Category);

/**
 * @desc    Update a category
 * @route   PATCH /api/categories/id
 * @access  Private (admin)
 */
exports.updateCategory = factory.updateOne(Category);
