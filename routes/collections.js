const express = require('express');
const { newCollection, getCollection, deleteCollection } = require('../controllers/collections');
const isAuth = require('../utils/auth');
const router = express.Router();

router.post('/new', isAuth, newCollection);

router.get('/:id', isAuth, getCollection);

router.delete('/:id', isAuth, deleteCollection)

module.exports = router;