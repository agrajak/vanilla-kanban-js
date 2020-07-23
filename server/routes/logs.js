const express = require('express');
const LogController = require('../controllers/logs');

const router = express.Router();

router.post('/', LogController.createLog);
router.get('/', LogController.findLogsByUserId);

module.exports = router;
