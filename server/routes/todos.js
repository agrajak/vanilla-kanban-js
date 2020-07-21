const express = require('express');
const TodoController = require('../controllers/todos');

const router = express.Router();

router.use('/', TodoController.findColumnsByUserId);

module.exports = router;
