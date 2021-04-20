const express = require('express');
const { userRegister, userLogin, getUser, userDelete, forgotPassword, resetPassword } = require('../controllers/users');
const { validRegister, validLogin, validEmail } = require('../utils/validator');
const isAuth = require('../utils/auth');
const router = express.Router();

router.post('/register', validRegister, userRegister);

router.post('/login', validLogin, userLogin);

router.post('/forgotpassword', validEmail, forgotPassword);

router.post('/resetpassword/:link', resetPassword);

router.get('/', getUser);

router.delete('/:id', isAuth, userDelete);

module.exports = router;