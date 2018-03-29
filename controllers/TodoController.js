const db = require('../config/db');
const TodoModel = require('../models/todoModel');

exports.TodoPerUser = (req, res) => {
  TodoModel.findAll({
      where: {
        token: req.body.token
      }
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
    completed: req.body.completed,
    token: req.body.token,
  })
  .then(() => {
    res.send(JSON.stringify({
      Message: 'Todo added.'
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