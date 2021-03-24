const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/user/:id', userCtrl.findOne);
router.get('/users', userCtrl.findAll);
router.delete('/user/:id', userCtrl.delete);

module.exports = router;