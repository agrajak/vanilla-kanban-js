const express = require('express');
const usersRouter = require('./routes/users');

const router = express.Router();
router.get('/users', usersRouter);

module.exports = router;
