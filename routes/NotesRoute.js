const express = require('express');
const router = express.Router();
const NotesController = require('../controllers/NotesController');

router.post('/createNote', NotesController.createNote);
router.post('/showNotes', NotesController.showNotes);
router.post('/deleteNote', NotesController.deleteNote);
router.post('/editNote', NotesController.editNote);

module.exports =  router;