const express = require('express');
const productController = require('../controllers/product');
const auth = require('../middlewares/auth');
const imageUpload = require('../middlewares/imageUpload');
const product = require('../middlewares/product');

const router = express.Router();

router
  .route('/')
  .get(productController.getAllProduct)
  .post(
    auth.protect,
    auth.restrictTo('admin'),
    imageUpload.uploadProductPhoto,
    imageUpload.resizeProductPhoto,
    product.setProductPhotoUrl,
    productController.createProduct
  );

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(
    auth.protect,
    auth.restrictTo('admin'),
    imageUpload.uploadProductPhoto,
    imageUpload.resizeProductPhoto,
    product.setProductPhotoUrl,
    productController.updateProduct
  )
  .delete(
    auth.protect,
    auth.restrictTo('admin'),
    productController.deleteProduct
  );

module.exports = router;
