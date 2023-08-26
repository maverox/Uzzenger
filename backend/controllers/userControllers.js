const asyncHandler = require('express-async-handler') // wrapper function to handle async errors thrown in a beautiful fashion
const User = require('../models/User')
const generateToken = require('../config/generateToken')
const bcrypt = require('bcryptjs')

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body; // destructuring the req body that was a json object

    // empty user field
    if (!(name && email && password)) {
        res.status(400);
        throw new Error("Please Enter all the Fields")
    }

    // userExists already
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // creating user
    const user = User.create({
        name,
        email,
        password,
        pic
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        })
    } else {
        res.status(400);
        throw new Error("Failed to  create User!");
    }
});

// authUser
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // empty user field
    const user = await User.findOne({ email }); // returns the matching user object
    //if user exists and password matches 
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        })
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
    
})

module.exports = { registerUser, authUser }
