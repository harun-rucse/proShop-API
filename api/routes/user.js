const express = require('express');
const userController = require('../controllers/user');
const auth = require('../middlewares/auth');
const user = require('../middlewares/user');
const imageUpload = require('../middlewares/imageUpload');

const router = express.Router();

router.use(auth.protect);

router.get('/me', user.getMe, userController.getUser);
router.patch(
  '/update-me',
  imageUpload.uploadUserPhoto,
  imageUpload.resizeUserPhoto,
  userController.updateMe
);

router.use(auth.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUser)
  .post(
    imageUpload.uploadUserPhoto,
    imageUpload.resizeUserPhoto,
    user.setUserPhotoUrl,
    userController.createUser
  );

router
  .route('/:id')
  .get(userController.getUser)
  .patch(
    imageUpload.uploadUserPhoto,
    imageUpload.resizeUserPhoto,
    user.setUserPhotoUrl,
    userController.updateUser
  )
  .delete(userController.deleteUser);

module.exports = router;
