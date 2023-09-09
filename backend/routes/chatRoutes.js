const express = require('express');
const { protect } = require('../middleware/authMiddlerware');
const { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup} = require('../controllers/chatControllers');
const router = express.Router();
router.route('/').post(protect, accessChat); // access chat
router.route('/').get(protect, fetchChats);// fetch chats
// creating groups

router.route('/group').post(protect, createGroupChat); // create group chat
 router.route('/rename').put(protect, renameGroup); // rename group chat
 router.route('/groupadd').put(protect, addToGroup);  // add user to group chat
 router.route('/groupremove').put(protect, removeFromGroup); // remove user from group chat

module.exports = router;    //exporting router to be used in server.js