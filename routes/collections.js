const express = require('express');
const { newCollection } = require('../controllers/collections');
const isAuth = require('../utils/auth');
const router = express.Router();

router.post('/new', isAuth, newCollection);

module.exports = router;