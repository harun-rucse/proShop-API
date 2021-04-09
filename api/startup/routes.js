const authRouter = require('../routes/auth');
const userRouter = require('../routes/user');
const productRouter = require('../routes/product');
const orderRouter = require('../routes/order');
const reviewRouter = require('../routes/review');
const categoryRouter = require('../routes/category');
const AppError = require('../utils/appError');
const globalErrorHandler = require('../controllers/error');

module.exports = (app) => {
  app.use('/api/auth', authRouter);
  app.use('/api/users', userRouter);
  app.use('/api/categories', categoryRouter);
  app.use('/api/products', productRouter);
  app.use('/api/orders', orderRouter);
  app.use('/api/reviews', reviewRouter);

  app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
  });

  app.use(globalErrorHandler);
};
