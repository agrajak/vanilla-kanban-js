const Note = require('../models/notes');
const ColumnService = require('../services/columns');
const pool = require('../pool');
const queries = require('../queries');

async function getTopPosition(columnId) {
  const [row] = await pool.query(queries.GET_NOTE_TOP_POSITION, [columnId]);
  const position = Object.values(row[0])[0];
  return position || 0;
}

async function increaseNotePos(columnId, position) {
  await pool.query(queries.INCREASE_NOTE_POSITION, [columnId, position]);
}

async function decraseNotePos(columnId, position) {
  await pool.query(queries.INCREASE_NOTE_POSITION, [columnId, position]);
}

async function createNote(note) {
  const {
    position, text, writerId, columnId,
  } = note;
  await pool.query(queries.CREATE_NOTE, [position, text, writerId, columnId]);
  const [row] = await pool.query(queries.GET_LAST_INSERTED_NOTE);
  return new Note(row[0]);
}

async function findNoteById(id) {
  const [row] = await pool.query(queries.FIND_NOTE, [id]);
  if (row.length === 0) {
    return null;
  }
  return new Note(row[0]);
}

async function updateNoteText(note) {
  const { id, text } = note;
  await pool.query(queries.UPDATE_NOTE_TEXT, [text, id]);
}

async function findNoteByPosition(columnId, position) {
  const [row] = await pool.query(queries.FIND_COLUMN_BY_POSITION, [columnId, position]);
  if (row.length === 0) {
    return null;
  }
  return new Note(row[0]);
}

// 체크
async function moveNote(note) {
  // note A를 포지션 B로 옮길 때, 포지션 B에 있던 노트와 A의 포지션을 각자 교환(swap)한다.
  // TODO -> 커넥션 하나에서 다 처리하기
  const { id, columnId, position } = note;
  const { columnId: oldColumn, position: oldPosition, writer } = await findNoteById(id);
  const oldNote = await findNoteByPosition(columnId, position, writer);
  await pool.query(queries.UPDATE_NOTE_POSITION, [oldColumn, oldPosition, oldNote.id]);
  await pool.query(queries.UPDATE_NOTE_POSITION, [columnId, position, id]);
}

async function deleteNoteById(id) {
  await pool.query(queries.DELETE_NOTE, [id]);
}

module.exports = {
  findNoteById,
  createNote,
  updateNoteText,
  moveNote,
  findNoteByPosition,
  deleteNoteById,
  getTopPosition,
  increaseNotePos,
  decraseNotePos,
};
