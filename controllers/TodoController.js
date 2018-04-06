const db = require('../config/db');
const TodoModel = require('../models/todoModel');
const moment = require('moment');

exports.TodoPerUser = (req, res) => {
  TodoModel.findAll({
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
      console.error("Error on TodoPerUser: ", err);
      res.sendStatus(500);
    });
};

exports.TodoAdd = (req, res) => {
  TodoModel.create({
    iduser: req.body.iduser,
    text: req.body.text,
    completed: false,
    token: req.body.token,
    created: moment()
  })
  .then(() => {
    res.send(JSON.stringify({
      added: true
    }));
  })
};

exports.TodoUpdate = (req, res) => {
  TodoModel.update({
    completed: req.body.completed
  }, {
    where: {
      idtodos: req.body.idtodos,
      token: req.body.token
    }
  })
  .then(() => {
    res.sendStatus(200);
  })
  .catch(error => {
    console.error("Error on TodoUpdate: ", error);
    res.sendStatus(500);
  })
};

exports.TodoDelete = (req, res) => {
  TodoModel.destroy({
    where: {
      idtodos: req.body.idtodos,
      token: req.body.token
    }
  })
  .then(data => {
    console.log(data);
    res.sendStatus(200);
  })
  .catch(error => {
    console.error("Error on TodoDelete: ", error);
    res.sendStatus(500);
  });
}