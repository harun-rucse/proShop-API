const express = require('express');
const categoryController = require('../controllers/category');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(categoryController.getAllCategory)
  .post(
    auth.protect,
    auth.restrictTo('admin'),
    categoryController.createCategory
  );

router
  .route('/:id')
  .get(categoryController.getCategory)
  .patch(
    auth.protect,
    auth.restrictTo('admin'),
    categoryController.updateCategory
  );

module.exports = router;
