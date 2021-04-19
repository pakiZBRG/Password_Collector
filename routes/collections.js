const express = require('express');
const { newCollection, getCollection, deleteCollection, updateCollection } = require('../controllers/collections');
const isAuth = require('../utils/auth');
const router = express.Router();

router.post('/new', isAuth, newCollection);

router.get('/:id', isAuth, getCollection);

router.delete('/:id', isAuth, deleteCollection);

router.patch('/:id', isAuth, updateCollection);

module.exports = router;