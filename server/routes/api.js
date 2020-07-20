const express = require('express');
const usersRouter = require('./users');
const columnRouter = require('./columns');

const router = express.Router();
router.use('/users', usersRouter);
router.use('/columns', columnRouter);

module.exports = router;
