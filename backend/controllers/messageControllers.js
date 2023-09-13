const asyncHandler = require('express-async-handler');   //to handle errors in async functions
const Message = require('../models/messageModel');
const Chat = require('../models/chatModel');
const User = require('../models/userModel');
// @route   POST /api/message
const createMessage = asyncHandler(async (req, res) => {

    const { chatId, content } = req.body;
    if (!chatId || !content) {
        res.status(400);
        throw new Error('Please enter all fields');
    }

    const newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    }
    try {
        let message = await Message.create(newMessage);
        message = await message.populate('sender', "name pic");//populate sender field with name and pic
        message = await message.populate('chat');
        message = await User.populate(message, {path: 'chat.users', select: 'name pic email'});//populate chat.users field with name and pic
        await Chat.findByIdAndUpdate(chatId, {latesMessage: message});//    update latestMessage field in Chat model
        res.status(201).json(message);
    } catch (error) {   
        res.status(400);
        throw new Error(error);
    }});
// @route   GET /api/message/:chatId // chatId is the id of 
const getMessagesByChatId = asyncHandler(async (req, res) => {
    const {chatId} = req.params;
    try {
        const messages = await Message.find({chat: chatId}).populate('sender', "name pic")
        .populate('chat').populate('chat.users', 'name pic email');
        res.status(200).json(messages);
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
});

// @desc    Create a new message
module.exports = { createMessage, getMessagesByChatId }