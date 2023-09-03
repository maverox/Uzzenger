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
// it will fetch all the chats of the logged in user and populate the latest message and sender details
// this controller is used in frontend to display all the chats of the logged in user
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

                res.status(200).send(results);
            });
    } catch (error) {
        res.status(500).json(error.message);
    }

});

// controller for creating group chat
const createGroupChat = asyncHandler(async (req, res) => {
    const { name, users, user } = req.body;
    if (!name || !users) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }
    const userList = JSON.parse(users);

    if (userList.length < 2) {
        return res.status(400).json({ message: 'Please add more than one user' });
    }
    userList.push(req.user._id);
    try {
        const newChat = await Chat.create({
            chatName: name,
            users: userList,
            isGroupChat: true,
            groupAdmin: user
        });
        const groupChat = await Chat.findOne({ _id: newChat._id }).populate('users', "-password").populate('groupAdmin', "-password");
        res.status(200).json({ chat: groupChat });
    } catch (error) {
        res.status(500).json({ message: 'Can\'t create chat' });
    }
    //route for renaming group chat
    
});
const renameGroup = asyncHandler(async (req, res) => {
        if (!req.body.chatId || !req.body.chatName) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        try {
            Chat.findByIdAndUpdate({ _id: req.body.chatId }, { chatName: req.body.chatName }, { new: true }).then((result) => {
                res.status(200).json({ chat: result });
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }

    });

// controller for adding user to group chat
const addToGroup = asyncHandler(async (req, res) => {
    const {chatId, userId} = req.body;
    if (!chatId || !userId) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }
     
    try {
        Chat.findByIdAndUpdate(chatId, { $push: { users: userId } }, { new: true })
        .populate('users', "-password").populate('groupAdmin', "-password")
        .then((result) => {
            res.status(200).json({ chat: result });});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})
//controller for removing user from group chat
const removeFromGroup = asyncHandler(async (req, res) => {
    const {chatId, userId} = req.body;
    if (!chatId || !userId) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }
    try {
        Chat.findByIdAndUpdate(chatId, {$pull: {users: userId}}, {new: true})
        .populate('users', "-password").populate('groupAdmin', "-password")
        .then((result) => {
            res.status(200).json({ chat: result});
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}) 
module.exports = { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup };