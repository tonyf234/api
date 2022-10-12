const express = require('express');

const userRouter = require('./userRouter');
const authRouter = require('./authRouter');

const notFound = require('./../utils/notFound');

const router = express.Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);

router.use(notFound);

module.exports = router;
