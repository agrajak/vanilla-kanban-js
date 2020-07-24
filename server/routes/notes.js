const express = require('express');
const NoteController = require('../controllers/notes');

const router = express.Router();

router.post('/', NoteController.createNote);
router.get('/', NoteController.findNoteById);
router.put('/text', NoteController.updateNoteText);
router.put('/position', NoteController.updateNotePosition);
router.delete('/', NoteController.deleteNote);

module.exports = router;
