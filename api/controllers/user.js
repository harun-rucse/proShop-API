const User = require('../models/user');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const filterObj = require('../utils/filterObject');

/**
 * @desc    Update current user data
 * @route   PATCH /api/users/update-me
 * @access  Private
 */
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /update-password.',
        400
      )
    );
  }

  const filteredBody = filterObj(req.body, 'name', 'email');

  if (req.file) filteredBody.photo = req.file.filename;

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    result: updatedUser
  });
});

/**
 * @desc    Get all user list
 * @route   GET /api/users
 * @access  Private
 */
exports.getAllUser = factory.getAll(User);

/**
 * @desc    Get single user
 * @route   GET /api/users/id
 * @access  Private
 */
exports.getUser = factory.getOne(User);

/**
 * @desc    Create new user
 * @route   POST /api/users
 * @access  Private
 */
exports.createUser = factory.createOne(User);

/**
 * @desc    Update a user
 * @route   PATCH /api/users/id
 * @access  Private
 */
exports.updateUser = factory.updateOne(User);

/**
 * @desc    Delete a user
 * @route   DELETE /api/users/id
 * @access  Private
 */
exports.deleteUser = factory.deleteOne(User);
