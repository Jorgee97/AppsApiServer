const express = require('express');
const router = express.Router();

const TodoController = require('../controllers/TodoController');

router.post('/retrieveTodoPerUser', TodoController.TodoPerUser);
router.post('/createTodo', TodoController.TodoAdd);
router.post('/todoState', TodoController.TodoUpdate);
router.post('/todoDelete', TodoController.TodoDelete);

module.exports = router;