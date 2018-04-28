const Sequelize = require('sequelize');

const sequelize = new Sequelize('appserver', 'root', 'server2018', {
  host: 'localhost',
  dialect: 'mysql',
  //logging: false,
  define: {
    timestamps: false,
    freezeTableName: true
  },

  pool: {
    max: 100,
    min: 0,
    idle: 1000
  }
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch(err => {
        console.error('Unable to connect to the database: ', err);
    });

module.exports = sequelize;
