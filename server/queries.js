module.exports = {
  FIND_USER: 'SELECT * from Users where id = ?',
  FIND_COLUMNS_BY_USER_ID: 'SELECT id from Columns where owner_id = ?',
  FIND_COLUMN: 'SELECT * from Columns where id = ?',
  FIND_NOTES_IN_COLUMN: 'SELECT id from Notes where column_id = ?',
  FIND_COLUMN_BY_POSITION: 'SELECT * from Columns where owner_id = ? and position = ?',
  UPDATE_COLUMN_TITLE: 'UPDATE Columns SET title = ? WHERE id = ?',
  UPDATE_COLUMN_POSITION: 'UPDATE Columns SET position = ? WHERE id = ?',
  DELETE_COLUMN: 'DELETE FROM Columns WHERE id = ?',
  CREATE_COLUMN: 'INSERT INTO Columns (title, owner_id, writer_id, position) VALUES (?, ?, ?, ?)',
  GET_LAST_INSERTED_COLUMN: 'SELECT * FROM Columns WHERE id = (SELECT LAST_INSERT_ID())',
  GET_COLUMN_TOP_POSITION: 'SELECT COUNT(*) FROM Columns WHERE owner_id = ?',
};
