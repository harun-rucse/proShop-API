const multer = require('multer');
const sharp = require('sharp');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const config = require('../config');

// Configure cloudinary
cloudinary.config({
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET_KEY
});

// Upload image to the cloudinary cloud
const uploadImage = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const cloudinaryUploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(cloudinaryUploadStream);
  });
};

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload an image', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');
exports.uploadProductPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const bufferPromise = sharp(req.file.buffer)
    .resize(300, 300)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toBuffer();

  const fileBuffer = await bufferPromise;
  const result = await uploadImage(fileBuffer, 'User');
  req.file.filename = result.url;

  next();
});

exports.resizeProductPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const bufferPromise = sharp(req.file.buffer)
    .resize(400, 400)
    .toFormat('jpeg')
    .jpeg({ quality: 95 })
    .toBuffer();

  const fileBuffer = await bufferPromise;
  const result = await uploadImage(fileBuffer, 'Product');
  req.file.filename = result.url;

  next();
});
