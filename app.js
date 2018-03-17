const express = require('express');
const app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
const types = require('./config/types');
const TodoRoute = require('./routes/TodoRoute');
const AuthRoute = require('./routes/AuthRoute');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(`/${types.HASH}/todo/api/v1`, TodoRoute);
app.use(`/${types.HASH}/auth/api/v1`, AuthRoute);

module.exports = app;