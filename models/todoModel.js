const db = require('../config/db');
const d = db.Sequelize;

const TodoSchema = db.define('todos', {
  idtodos: {
    type: d.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  text: {
    type: d.STRING
  },
  completed: {
    type: d.BOOLEAN
  },
  iduser: {
    type: d.INTEGER
  }
});

module.exports = TodoSchema;