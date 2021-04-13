const express = require('express');
const { newCollection, getCollection } = require('../controllers/collections');
const isAuth = require('../utils/auth');
const router = express.Router();

router.post('/new', isAuth, newCollection);

router.get('/:id', isAuth, getCollection);

module.exports = router;