const express = require('express');
const ColumnController = require('../controllers/columns');

const router = express.Router();

router.post('/', ColumnController.createColumn);
router.get('/', ColumnController.findColumn);
router.put('/title', ColumnController.updateColumnTitle);
router.put('/position', ColumnController.updateColumnPosition);
router.delete('/', ColumnController.deleteColumn);

module.exports = router;