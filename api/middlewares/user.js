exports.getMe = (req, res, next) => {
  req.params.id = req.user._id;

  next();
};

exports.setUserPhotoUrl = (req, res, next) => {
  if (!req.file) return next();

  req.body.photo = req.file.filename;
  next();
};
