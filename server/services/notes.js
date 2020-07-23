const ColumnService = require('./columns');
const Note = require('../models/notes');
const pool = require('../pool');
const queries = require('../queries');

async function getTopPosition(columnId, conn = pool) {
  const [row] = await conn.query(queries.GET_NOTE_TOP_POSITION, [columnId]);
  return row[0]['COUNT(*)'] || 0;
}

async function increaseNotePos(columnId, position, conn = pool) {
  await conn.query(queries.INCREASE_NOTE_POSITION, [columnId, position]);
}

async function decraseNotePos(columnId, position, conn = pool) {
  await conn.query(queries.DECREASE_NOTE_POSITION, [columnId, position]);
}

async function createNote(note, conn = pool) {
  const {
    position, text, writerId, columnId,
  } = note;
  const { ownerId } = await ColumnService.findColumnById(columnId, conn);
  await conn.query(queries.CREATE_NOTE, [position, text, writerId, columnId]);
  const [row] = await conn.query(queries.GET_LAST_INSERTED_NOTE, [ownerId]);
  return new Note(row[0]);
}

async function findNoteById(id, conn = pool) {
  const [row] = await conn.query(queries.FIND_NOTE, [id]);
  if (row.length === 0) {
    return null;
  }
  return new Note(row[0]);
}

async function updateNoteText(note, conn = pool) {
  const { id, text } = note;
  await conn.query(queries.UPDATE_NOTE_TEXT, [text, id]);
}

async function findNoteByPosition(columnId, position, conn = pool) {
  const [row] = await conn.query(queries.FIND_COLUMN_BY_POSITION, [columnId, position]);
  if (row.length === 0) {
    return null;
  }
  return new Note(row[0]);
}

async function moveNote(note, conn = pool) {
  const { id, columnId, position: targetPosition } = note;
  const maxPosition = await getTopPosition(columnId, conn);
  const position = Math.min(targetPosition, maxPosition);
  const { columnId: oldColumnId, position: oldPosition } = await findNoteById(id, conn);
  await decraseNotePos(oldColumnId, oldPosition, conn);
  await increaseNotePos(columnId, position, conn);
  await conn.query(queries.UPDATE_NOTE_POSITION, [columnId, position, id]);
}

async function deleteNoteById(id, conn = pool) {
  const { columnId, position } = await findNoteById(id, conn);
  await conn.query(queries.DELETE_NOTE, [id]);
  await decraseNotePos(columnId, position, conn);
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
