
const express = require('express');
const { protect } = require('../middleware/authMiddlerware');
const router = express.Router();

const { createMessage, getMessagesByChatId } = require('../controllers/messageControllers');
// @route   POST /api/message
router.route('/').post(protect, createMessage); // create a new message
// @route   GET /api/message/:chatId
router.route('/:chatId').get(protect, getMessagesByChatId); // get messages by chat id

module.exports = router; //exporting router to be used in server.js


