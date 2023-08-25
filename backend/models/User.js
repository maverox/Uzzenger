const mongoose = require('mongoose')

//Schema
const userModel = mongoose.Schema(
    {
        name: {
            type: String, required: true
        },
        email: {
            type: String, unique: true, required: true
        },
        password: {
            type: String, trim: true, required: true
        },
        pic: {
            type: String, required: true,
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        },
    },
    {
        timestamp: true
    }
)

// Model
const User = mongoose.model("User", userModel)
module.exports = User;