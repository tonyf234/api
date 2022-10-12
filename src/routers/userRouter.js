const express = require('express');

const userController = require('../controllers/userController');

const authGuard = require('../guards/authGuard');
const adminGuard = require('../guards/adminGuard');

const router = express.Router();

router.get('/connected', userController.getConnected)
router.get('/me', authGuard, userController.getPersonalInfo);
router.get('/', adminGuard, userController.getAllUsers);

module.exports = router;
