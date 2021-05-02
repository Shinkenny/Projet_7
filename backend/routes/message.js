const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const messageCtrl = require('../controllers/message');

router.post('/create', auth, messageCtrl.createMessage);
router.get('/getAll', auth, messageCtrl.getAllMessages);
router.get('/:id', auth, messageCtrl.findOneMessage);
router.delete('/:id', auth, messageCtrl.deleteMessage);

module.exports = router;