const { addMessage, getAllMessage } = require('../controllers/messagesContoller');
const { } = require('../controllers/userContollers');

const router = require('express').Router();

router.post('/addmsg/', addMessage)
router.post('/getmsg/', getAllMessage)

module.exports = router;