const db = require('../config/db');
const UserModel = require('../models/userModel');
const crypo = require('crypto');

exports.RegisterUser = (req, res) => {
  let token = crypo.randomBytes(50).toString('hex');
  UserModel.create({
    uname: req.body.uname,
    email: req.body.email,
    password: req.body.password,
    isLogged: false,
    token: token
  }).then(() => {
    res.send(JSON.stringify({
      Message: 'Hey, You have been register to our TODOS app.'
    }));
  });
}

exports.LoginUser = (req, res) => {
  UserModel.findOne({
      where: {
        email: req.body.email,
        password: req.body.password
      },
      attributes: ['uname', 'iduser', 'isLogged', 'token']
    })
    .then((data) => {
      if (data != null)
        return data.update({ isLogged: true });
    })
    .then(data => {
      if (data != null)
        res.send(data);
      else
        res.send({ error: 'There was an error with your data, please try again.' });
    })
    .catch(error => {
      console.error("Error on login: ", error);
      res.send(500);
    });
};

exports.LogoutUser = (req, res) => {
  UserModel.findOne({
    where: {
      token: req.body.token
    }
  })
  .then((data) => {
    if(data != null)
      return data.update({ isLogged: false });
  })
  .then(data => {
    res.sendStatus(200);
  })
  .catch(error => {
    console.error("Error on logout: ", error);
    res.send(500);
  });
};

exports.loginWithToken = (req, res) => {
  UserModel.findOne({
    where: {
      token: req.body.token
    },
    attributes: ['uname', 'iduser', 'isLogged', 'token']
  })
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error("Error on loginWithToken: ", error);
    res.send(500);
  });
};