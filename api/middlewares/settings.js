const Settings = require('../models/settings');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.checkExists = catchAsync(async (req, res, next) => {
  const settings = await Settings.countDocuments();
  console.log(settings);

  if (settings > 0) {
    return next(new AppError('Settings already exists!', 400));
  }

  next();
});
