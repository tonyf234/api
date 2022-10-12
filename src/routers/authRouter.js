const express = require('express');

const authController = require('../controllers/authController');
const authGuard = require('../guards/authGuard');

const router = express.Router();

router.post('/signup', authController.signup);

router.post('/signin', authController.signin);

router.get('/test', authGuard, authController.testpage);

module.exports = router;
