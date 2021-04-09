const express = require('express');
const orderController = require('../controllers/order');
const auth = require('../middlewares/auth');

const router = express.Router();

router.use(auth.protect);

router
  .route('/')
  .get(auth.restrictTo('admin'), orderController.getAllOrder)
  .post(orderController.createOrder);

router
  .route('/:id')
  .get(orderController.getOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = router;
