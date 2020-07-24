const Note = require('../models/notes');
const Log = require('../models/logs');
const NoteService = require('../services/notes');
const ColumnService = require('../services/columns');
const LogService = require('../services/logs');
const pool = require('../pool');

exports.createNote = async (req, res) => {
  const { ownerId = 'agrajak', writer = 'agrajak', columnId, text } = req.body;
  try {
    const { title } = await ColumnService.findColumnById(columnId);
    const conn = await pool.getConnection();
    await NoteService.increaseNotePos(columnId, 0, conn);
    const note = await NoteService.createNote(new Note({
      position: 0, text, writerId: writer, columnId, ownerId,
    }), conn);
    await conn.release();

    await LogService.createLog(new Log({
      ownerId: 'agrajak', writerId: writer, type: 'Note', action: 'create', target: title,
    }));
    return res.send({
      success: true,
      payload: {
        note,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.findNoteById = async (req, res) => {
  const { id } = req.query;
  try {
    const note = await NoteService.findNoteById(id);
    return res.send({
      success: true,
      note,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateNoteText = async (req, res) => {
  const { id, text } = req.body;
  try {
    const { columnId, text: oldText } = await NoteService.findNoteById(id);
    const { ownerId } = await ColumnService.findColumnById(columnId);
    await NoteService.updateNoteText(new Note({
      id, text,
    }));
    await LogService.createLog(new Log({
      ownerId, writerId: 'agrajak', type: 'Note', action: 'edit', source: oldText, target: text,
    }));
    return res.send({
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateNotePosition = async (req, res) => {
  const { id, columnId, position } = req.body;
  try {
    const { text, columnId: oldColumn, position: oldPosition } = await NoteService.findNoteById(id);
    const { ownerId, title } = await ColumnService.findColumnById(columnId);
    const conn = await pool.getConnection();
    await NoteService.moveNote(new Note({
      id, columnId, position,
    }), conn);
    await conn.release();
    if (position === oldPosition) {
      return res.send({
        success: true,
      });
    }
    if (columnId === oldColumn) {
      await LogService.createLog(new Log({
        ownerId, writerId: 'agrajak', type: 'Note', action: 'move', source: text,
      }));
      return res.send({
        success: true,
      });
    }
    await LogService.createLog(new Log({
      ownerId, writerId: 'agrajak', type: 'Note', action: 'move', source: text, target: title,
    }));
    return res.send({
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteNote = async (req, res) => {
  const { id } = req.query;
  try {
    const { columnId, text } = await NoteService.findNoteById(id);
    const { ownerId } = await ColumnService.findColumnById(columnId);
    await NoteService.deleteNoteById(id);
    await LogService.createLog(new Log({
      ownerId, writerId: 'agrajak', type: 'Note', action: 'delete', source: text,
    }));
    return res.send({
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
