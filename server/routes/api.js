const express = require('express');
const usersRouter = require('./users');
const notesRouter = require('./notes');

const router = express.Router();
router.use('/users', usersRouter);
router.use('/notes', notesRouter);

module.exports = router;
