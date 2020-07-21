const Note = require('../models/notes');
const NoteService = require('../services/notes');

exports.createNote = async (req, res) => {
  const { writer, columnId, text } = req.body;
  try {
    const position = await NoteService.getTopPosition(columnId);
    const note = await NoteService.createNote(new Note({
      position, text, writer, columnId,
    }));
    return res.send({
      success: true,
      noteId: note.id,
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
    await NoteService.moveNote(new Note({
      id, columnId, position,
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
    await NoteService.deleteNote(id);
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
