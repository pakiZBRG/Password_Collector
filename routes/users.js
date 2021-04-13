const express = require('express');
const { userRegister, userLogin, getUser, userDelete } = require('../controllers/users');
const { validRegister, validLogin } = require('../utils/validator');
const isAuth = require('../utils/auth');
const router = express.Router();

router.post('/register', validRegister, userRegister);

router.post('/login', validLogin, userLogin);

router.get('/:id', getUser);

router.delete('/:id', isAuth, userDelete);

module.exports = router;