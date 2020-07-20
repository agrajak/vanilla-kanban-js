const express = require('express');
const usersRouter = require('./users');

const router = express.Router();
router.get('/users', usersRouter);

module.exports = router;
