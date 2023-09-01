const mongoose = require('mongoose')
// mongoose is an object hence it can be destructured like this {Schema, model} = mongoose
//Schema for chat
const chatModel = mongoose.Schema({
    // chatName
    chatName: { type: String, trim: true },

    // isGroupChat
    isGroupChat: { type: Boolean, default: false },

    // users
    users: [{
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }],

    // latestMessage
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Messages"
    },

    // groupAdmin
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }, 

},
//timestamps
    {
        timsestamps: true
    },
)

// making the model for it using the schema
const Chat = mongoose.model("Chat", chatModel);


module.exports = Chat;