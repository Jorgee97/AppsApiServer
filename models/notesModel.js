const db = require('../config/db');
const d = db.Sequelize;

const NoteSchema = db.define('notes', {
  idnotes: {
    type: d.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  text: {
    type: d.TEXT
  },
  token: {
    type: d.STRING
  },
  created: {
    type: d.DATE
  },
  title: {
    type: d.TEXT
  }
});

module.exports = NoteSchema;