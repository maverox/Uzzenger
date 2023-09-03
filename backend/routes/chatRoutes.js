const express = require('express');
const { protect } = require('../middleware/authMiddlerware');
const { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup} = require('../controllers/chatControllers');
const router = express.Router();

router.route('/').post(protect, accessChat).get(protect, fetchChats); // access chat and fetch chats 
// creating groups

router.route('/group').post(protect, createGroupChat); // create group chat
 router.route('/rename').put(protect, renameGroup); // rename group chat
 router.route('/groupAdd').put(protect, addToGroup);  // add user to group chat
 router.route('/groupRemove').put(protect, removeFromGroup); // remove user from group chat

module.exports = router;    //exporting router to be used in server.js