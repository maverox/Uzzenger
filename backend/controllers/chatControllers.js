const asyncHandler = require('express-async-handler');
const Chat = require('../models/chatModel');
const User = require('../models/userModel');

const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        console.log('No user id');
        return res.status(400).json({ message: 'No user id' });
    }
    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: userId } } }, // matching receiver id
            { users: { $elemMatch: { $eq: req.user._id } } }// matching sender id
        ] // populate is to replace the path with the actual data in the referenced collections
    }).populate('users', "-password").populate('latestMessage');
    isChat = await User.populate(isChat, { path: "latestMessage.sender", select: "name pic email", });

    if (isChat.length > 0) {
        return res.status(200).json({ chat: isChat[0] });
    } else {
        const newChat = await Chat.create({
            name: req.user.name,
            users: [userId, req.user._id],
            isGroupChat: false,
        });
        try {
            const createdChat = await Chat.create(newChat);
            const FullChat = await Chat.findById(createdChat._id).populate('users', "-password");
            res.status(200).json({ chat: FullChat });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };



})

// fetch chat controller
const fetchChats = asyncHandler(async (req, res) => {

    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate('users', "-password")
            .populate('groupAdmin', "-password").
            populate('latestMessage')
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender", 
                    select: "name pic email",
                });

               res.status(200).send( results );
            });
    } catch (error) {
        res.status(500).json(error.message);
    }

});

// controller for creating group chat

module.exports = { accessChat, fetchChats };