const db = require('../config/db');
const UserModel = require('../models/userModel');
const crypo = require('crypto');
const AuthGenerator = require('../util/AuthGenerators'); 

exports.RegisterUser = (req, res) => {
  let token = crypo.randomBytes(50).toString('hex');
  // Handling the password
  var salt = AuthGenerator.genRandomString(20);
  let password = AuthGenerator.sha512(req.body.password, salt);
  UserModel.create({
    uname: req.body.uname,
    email: req.body.email,
    password: password.passwordHash,
    isLogged: false,
    token: token,
    salthash: salt
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
      },
      attributes: ['uname', 'iduser', 'isLogged', 'token', 'salthash']
    })
    .then((data) => {
      if (data != null) {
        console.log(data);
        let salt = data.salthash;
        let password = AuthGenerator.sha512(req.body.password, salt);
        UserModel.findOne({
          where: {
            email: req.body.email,
            password: password.passwordHash
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
          res.send({ error: 'There was an error with the server, please try again in a few minutes.' });
          console.error("Error on login: ", error);
          
        });
      }  
    })
    .catch(error => {
      res.send({ error: 'There was an error with your data, please try again.' });
    })
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