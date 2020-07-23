const Log = require('../models/logs');
const pool = require('../pool');
const queries = require('../queries');

async function findLogsByUserId(ownerId) {
  const [row] = await pool.query(queries.FIND_LOGS_BY_USER_ID, [ownerId]);
  return row.map((data) => new Log(data));
}

async function createLog(log) {
  const {
    ownerId, writerId, type, action, target, source,
  } = log;
  await pool.query(queries.CREATE_LOG, [ownerId, writerId, type, action, target, source]);
  const [row] = await pool.query(queries.GET_LAST_INSERTED_LOG);
  return new Log(row[0]);
}

module.exports = {
  findLogsByUserId,
  createLog,
};
