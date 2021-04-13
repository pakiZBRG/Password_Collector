const express = require('express');
const { validEmail } = require('../utils/validator');
const { newPassword } = require('../controllers/passwords');
const router = express.Router();

router.post('/new', validEmail, newPassword);

module.exports = router;