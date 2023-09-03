const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
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
        timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' }
    }
)

// encrypt password before saving the model to dB
userModel.pre("save", async function (next) {
    if (!this.isModified) {
        next(); //next is a function that is called after the pre function is executed which in our case is encrypting the password its the equivalent of contiue in c++
    } else {
        const saltRounds = 10;// more rounds more secure but more time to encrypt slower hashing means more secure as cyber criminals will take more time to crack it
        const salt = await bcrypt.genSalt(saltRounds);
        this.password = await bcrypt.hash(this.password, salt);
    }
})
// match password
userModel.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password); // asyncly returns after comparing password string with hashed password output
}

// Model
const User = mongoose.model("User", userModel)

module.exports = User;