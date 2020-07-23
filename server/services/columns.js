const Column = require('../models/columns');
const Note = require('../models/notes');
const pool = require('../pool');
const queries = require('../queries');

async function findColumnsByUserId(userId, conn = pool) {
  const [row] = await conn.query(queries.FIND_COLUMNS_BY_USER_ID, [userId]);
  return row.map((data) => new Column(data));
}

async function findColumnById(id, conn = pool) {
  const [row] = await conn.query(queries.FIND_COLUMN, [id]);
  if (row.length === 0) {
    return null;
  }
  return new Column(row[0]);
}

async function findColumnByPosition(ownerId, position, conn = pool) {
  const [row] = await conn.query(queries.FIND_COLUMN_BY_POSITION, [ownerId, position]);
  if (row.length === 0) {
    return null;
  }
  return new Column(row[0]);
}

async function findColumnInfo(columnId, conn = pool) {
  const [row] = await conn.query(queries.FIND_NOTES_IN_COLUMN, [columnId]);
  return row.map((note) => new Note(note));
}
async function getLastPosition(ownerId, conn = pool) {
  const [row] = await conn.query(queries.GET_COLUMN_LAST_POSITION, [ownerId]);
  return row[0]['COUNT(*)'] || 0;
}

async function createColumn(column, conn = pool) {
  const {
    title, ownerId, writerId,
  } = column;
  const position = await getLastPosition(ownerId, conn);
  await conn.query(queries.CREATE_COLUMN, [title, ownerId, writerId, position]);
  const [row] = await conn.query(queries.GET_LAST_INSERTED_COLUMN, [ownerId]);
  // 트랜젝션이 롤백된 경우에도 auto_increment의 값은 올라가서 제대로 된 id값을 못 찾을 수도 있다.
  return new Column(row[0]);
}

async function updateColumnTitle(column, conn = pool) {
  const { id, title } = column;
  await conn.query(queries.UPDATE_COLUMN_TITLE, [title, id]);
}

async function decreaseColumnPos(ownerId, position, conn = pool) {
  await conn.query(queries.DECREASE_COLUMN_POSITION, [ownerId, position]);
}

async function increaseColumnPos(ownerId, position, conn = pool) {
  await conn.query(queries.INCREASE_COLUMN_POSITION, [ownerId, position]);
}

async function moveColumn(column, conn = pool) {
  // 컬럼 A를 포지션 B로 옮길 때, 포지션 B에 있던 컬럼과 A의 포지션을 각자 교환(swap)한다.
  // TODO -> 커넥션 하나에서 다 처리하기
  const { id, position } = column;
  const { position: oldPosition, ownerId } = await findColumnById(id, conn);
  await decreaseColumnPos(ownerId, oldPosition, conn);
  await increaseColumnPos(ownerId, position, conn);
  await conn.query(queries.UPDATE_COLUMN_POSITION, [position, id]);
}

async function deleteColumnById(id, conn = pool) {
  const { position, ownerId } = await findColumnById(id, conn);
  await conn.query(queries.DELETE_COLUMN, [id]);
  await decreaseColumnPos(ownerId, position, conn);
}

module.exports = {
  findColumnsByUserId,
  findColumnById,
  findColumnInfo,
  createColumn,
  updateColumnTitle,
  moveColumn,
  deleteColumnById,
  getLastPosition,
};
