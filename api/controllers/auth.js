const jwt = require('jsonwebtoken');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const config = require('../config');

// create JWT token
const signToken = (id) => {
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN
  });
};

// send JWT token to the client
const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  // set token as a cookie
  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + config.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    sameSite: 'none'
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    result: {
      token,
      name: user.name,
      photo: user.photo,
      role: user.role
    }
  });
};

/**
 * @desc    Register a new User
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm
  });

  createSendToken(newUser, 201, req, res);
});

/**
 * @desc    Login a User
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);
});

/**
 * @desc Logout
 * @route GET /api/auth/logout
 * @access  Private
 */
exports.logout = (req, res, next) => {
  res.cookie('jwt', 'loggoutcookie', {
    expires: new Date(Date.now() + 10),
    httpOnly: true
  });

  res.status(200).json({ status: 'success' });
};

/**
 * @desc    Update current user password
 * @route   PATCH /api/auth/update-password
 * @access  Private
 */
exports.updatePassword = catchAsync(async (req, res, next) => {
  const { passwordCurrent, password, passwordConfirm } = req.body;

  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if passwordCurrent, password and passwordConfirm exist
  if (!passwordCurrent || !password || !passwordConfirm) {
    return next(
      new AppError('Please provide current password and new password', 400)
    );
  }

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = password;
  user.passwordConfirm = passwordConfirm;
  await user.save();

  // 4) Log user in, send JWT
  createSendToken(user, 200, req, res);
});
