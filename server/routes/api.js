const express = require('express');

const usersRouter = require('./users');
const columnRouter = require('./columns');
const todoRouter = require('./todos');

const router = express.Router();

router.use('/users', usersRouter);
router.use('/columns', columnRouter);
router.use('/todos', todoRouter);

module.exports = router;
