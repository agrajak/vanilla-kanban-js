const Note = require('../models/notes');
const NoteService = require('../services/notes');
const pool = require('../pool');

exports.createNote = async (req, res) => {
  const { writer = 'agrajak', columnId, text } = req.body;
  try {
    const conn = await pool.getConnection();
    await NoteService.increaseNotePos(columnId, 0, conn);
    const note = await NoteService.createNote(new Note({
      position: 0, text, writerId: writer, columnId,
    }), conn);
    await conn.release();
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
    await NoteService.updateNoteText(new Note({
      id, text,
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
    const conn = await pool.getConnection();
    await NoteService.moveNote(new Note({
      id, columnId, position,
    }), conn);
    await conn.release();
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
    await NoteService.deleteNoteById(id);
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
