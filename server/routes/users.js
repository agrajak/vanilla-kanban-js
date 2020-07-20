const express = require('express');
const pool = require('../pool');

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * from Users');
    console.log(rows);
  } catch (e) {
    console.log(e.stack);
  }

  res.send('respond with a resource');
});

module.exports = router;
