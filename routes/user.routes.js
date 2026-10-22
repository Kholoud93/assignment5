const express = require('express');
const { signup, upsertUser, getUserByEmail, getUserById } = require('../controllers/user.controller');

const router = express.Router();

router.post('/users/signup', signup);
router.put('/users/:id', upsertUser);
router.get('/users/by-email', getUserByEmail);
router.get('/user/:id', getUserById);

module.exports = router;
