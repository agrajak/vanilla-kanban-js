const express = require('express');

const router = express.Router();
const UserController = require('../controllers/users');

/* GET users listing. */
router.get('/', UserController.findUser);

module.exports = router;
