const Note = require('../models/notes');
const pool = require('../pool');
const queries = require('../queries');
const ColumnService = require('./columns');

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
  const { id, columnId, position } = note;
  const { columnId: oldColumn, position: oldPosition, writer } = await findNoteById(id);
  const oldNote = await findNoteByPosition(columnId, position, writer);
  await pool.query(queries.UPDATE_NOTE_POSITION, [oldColumn, oldPosition, oldNote.id]);
  await pool.query(queries.UPDATE_NOTE_POSITION, [columnId, position, id]);
}

async function deleteNoteById(id) {
  const { id: columnId, position } = await ColumnService.findColumnById(id);
  await pool.query(queries.DELETE_NOTE, [id]);
  await decraseNotePos(columnId, position);
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
