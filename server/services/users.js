const User = require('../models/users');
const pool = require('../pool');
const queries = require('../queries');

async function findUser(userId) {
  const [row] = await pool.query(queries.FIND_USER, [userId]);
  if (row.length === 0) {
    return null;
  }
  return new User(row[0]);
}

module.exports = {
  findUser,
};
