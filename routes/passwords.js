const express = require('express');
const { newPassword } = require('../controllers/passwords');
const router = express.Router();

router.post('/new', newPassword);

module.exports = router;