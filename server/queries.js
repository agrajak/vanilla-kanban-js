module.exports = {
  FIND_USER: 'SELECT * from Users where id = ?',
  FIND_COLUMNS_ID: 'SELECT id from Columns where owner_id = ?',
  GET_NOTE_TOP_POSITION: 'SELECT COUNT(*) FROM Notes WHERE column_id = ?',
  CREATE_NOTE: 'INSERT INTO Notes (position, text, writer_id, columnId) VALUES (?, ?, ?, ?)',
  GET_LAST_INSERTED_NOTE: 'SELECT * FROM Notes WHERE id = (SELECT LAST_INSERT_ID())',
  FIND_NOTE: 'SELECT * from Notes where id = ?',
  UPDATE_COLUMN_TITLE: 'UPDATE Notes SET text = ? WHERE id = ?',
  FIND_NOTE_BY_POSITION: 'SELECT * from Notes where column_id = ? and position = ?',
  UPDATE_NOTE_POSITION: 'UPDATE Notes SET column_id = ?, position = ? WHERE id = ?',
  DELETE_COLUMN: 'DELETE FROM Notes WHERE id = ?',
};
