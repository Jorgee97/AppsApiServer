const db = require('../config/db');
const moment = require('moment');
const NotesModel = require('../models/notesModel');

exports.createNote = (req, res) => {
  NotesModel.create({
    text: req.body.text,
    token: req.body.token,
    created: moment(),
    title: req.body.title
  })
  .then(() => {
    res.send(JSON.stringify({
      added: true
    }));
  })
};

exports.showNotes = (req, res) => {
  NotesModel.findAll({
    where: {
      token: req.body.token
    },
    order: [
      ['created', 'ASC']
    ]
  })
  .then(data => {
    if (data != null)
      res.send(data);
    else
      res.send({});
  })
  .catch(err => {
    res.sendStatus(500);
    console.error(err);
  });
};

exports.deleteNote = (req, res) => {
  console.log(req.body);
  NotesModel.destroy({
    where: {
      idnotes: req.body.idnotes,
      token: req.body.token
    }
  })
  .then(() => {
    res.sendStatus(200);
  })
  .catch(err => {
    res.sendStatus(500);
    console.error("Error while deleting a Note: ", error);
  });
};
