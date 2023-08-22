const mongoose = require('mongoose')

//SChema
const messageModel = mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat"
        },
        content: {
            type: String,
            trim: true
        }
    },
    {
        timestamp: true,
    }

)

// Model
const Message = mongoose.model("Message", messageModel);

module.exports = messageModel;