const Column = require('../models/columns');
const pool = require('../pool');
const queries = require('../queries');

async function findColumnsByUserId(userId) {
  const [row] = await pool.query(queries.FIND_COLUMNS_BY_USER_ID, [userId]);
  return row.map((data) => new Column(data));
}

async function findColumnById(id) {
  const [row] = await pool.query(queries.FIND_COLUMN, [id]);
  if (row.length === 0) {
    return null;
  }
  return new Column(row[0]);
}

async function findColumnByPosition(ownerId, position) {
  const [row] = await pool.query(queries.FIND_COLUMN_BY_POSITION, [ownerId, position]);
  if (row.length === 0) {
    return null;
  }
  return new Column(row[0]);
}

async function findColumnInfo(columnId) {
  const [row] = await pool.query(queries.FIND_NOTES_IN_COLUMN, [columnId]);
  return row.map(({ id }) => id);
}
async function getTopPosition() {
  const [row] = await pool.query(queries.GET_COLUMN_TOP_POSITION);
  return row[0] || 0;
}

async function createColumn(column) {
  const {
    title, ownerId, writerId, position,
  } = column;
  await pool.query(queries.CREATE_COLUMN, [title, ownerId, writerId, position]);
  const [row] = await pool.query(queries.GET_LAST_INSERTED_COLUMN);
  // 트랜젝션이 롤백된 경우에도 auto_increment의 값은 올라가서 제대로 된 id값을 못 찾을 수도 있다.
  return new Column(row[0]);
}

async function updateColumnTitle(column) {
  const { id, title } = column;
  await pool.query(queries.UPDATE_COLUMN_TITLE, [title, id]);
}

async function updateColumnPosition(column) {
  // 컬럼 A를 포지션 B로 옮길 때, 포지션 B에 있던 컬럼과 A의 포지션을 각자 교환(swap)한다.
  const { id, position, ownerId } = column;
  const { position: oldPosition } = await findColumnById(id);
  const oldColumn = await findColumnByPosition(ownerId, position);
  await pool.query(queries.UPDATE_COLUMN_POSITION, [oldPosition, oldColumn.id]);
  await pool.query(queries.UPDATE_COLUMN_POSITION, [position, id]);
}

async function deleteColumnById(id) {
  await pool.query(queries.DELETE_COLUMN, [id]);
}

module.exports = {
  findColumnsByUserId, findColumnById, findColumnInfo, createColumn, updateColumnTitle, updateColumnPosition, deleteColumnById, getTopPosition,
};
