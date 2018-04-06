const db = require('../config/db');
const d = db.Sequelize;

const UserSchema = db.define('user', {
  iduser: {
    type: d.INTEGER,
    primaryKey: true, 
    autoIncrement: true
  },
  uname: {
    type: d.STRING
  },
  email: {
    type: d.STRING
  },
  password: {
    type: d.STRING
  },
  isLogged: {
    type: d.BOOLEAN
  },
  token: {
    type: d.STRING
  }, 
  salthash: {
    type: d.TEXT
  }
});

module.exports = UserSchema;