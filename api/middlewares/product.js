exports.setProductPhotoUrl = (req, res, next) => {
  if (!req.file) return next();

  req.body.photo = req.file.filename;
  next();
};
