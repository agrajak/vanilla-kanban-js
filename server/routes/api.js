const express = require('express');

const usersRouter = require('./users');

const notesRouter = require('./notes');
const columnRouter = require('./columns');
const todoRouter = require('./todos');
const logRouter = require('./logs');

const router = express.Router();

router.use('/users', usersRouter);
router.use('/notes', notesRouter);
router.use('/columns', columnRouter);
router.use('/todos', todoRouter);
router.use('/logs', logRouter);

module.exports = router;
