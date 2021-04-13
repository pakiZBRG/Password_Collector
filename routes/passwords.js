const express = require('express');
const { validEmail } = require('../utils/validator');
const { newPassword, getPasswords } = require('../controllers/passwords');
const isAuth = require('../utils/auth');
const router = express.Router();

router.post('/new', validEmail, isAuth, newPassword);

router.get('/:userId', isAuth, getPasswords);

module.exports = router;