const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');

router.post('/registerUser', AuthController.RegisterUser);
router.post('/loginUser', AuthController.LoginUser);
router.post('/logoutUser', AuthController.LogoutUser);
router.post('/loginWithToken', AuthController.loginWithToken);

module.exports = router;