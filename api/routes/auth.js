const express = require('express');
const authController = require('../controllers/auth');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);

router.patch('/update-password', auth.protect, authController.updatePassword);
router.get('/logout', auth.protect, authController.logout);

module.exports = router;
