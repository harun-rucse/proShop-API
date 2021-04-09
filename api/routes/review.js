const express = require('express');
const reviewController = require('../controllers/review');
const auth = require('../middlewares/auth');
const review = require('../middlewares/review');

const router = express.Router();

router
  .route('/')
  .get(reviewController.getAllReview)
  .post(auth.protect, reviewController.createReview);

router.use(auth.protect);

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(review.checkUserAccessible, reviewController.updateReview)
  .delete(review.checkUserAccessible, reviewController.deleteReview);

module.exports = router;
