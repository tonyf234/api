const express = require('express');

const reportController = require('./../controllers');

const adminGuard = require('./../guards/adminGuard');
const authGuard = require('./../guards/authGuard');

const router = express.Router();

router.get('/me', authGuard, reportController.getMyReports);

router.post('/send', authGuard, reportController.sendReport);

router.get('/', adminGuard, reportController.getAllReports);

module.exports = router;
