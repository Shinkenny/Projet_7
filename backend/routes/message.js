const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const messageCtrl = require('../controllers/message');

router.post('/create', messageCtrl.createMessage);
router.get('/getAll', messageCtrl.getAllMessages);
router.get('/:id', messageCtrl.findOneMessage);
router.delete('/:id', messageCtrl.deleteMessage);

module.exports = router;