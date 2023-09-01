const asyncHandler = require('express-async-handler') // wrapper function to handle async errors thrown in a beautiful fashion
const User = require('../models/userModel')
const generateToken = require('../config/generateToken')
const bcrypt = require('bcryptjs')
//async because we are making a request to the database
//registerUser
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
    const user =  User.create({
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
//api route for searching user using query 
const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
        $or: [  // or operator
            { name: { $regex: req.query.search, $options: 'i' } }, // i for case insensitive
            { email: { $regex: req.query.search, $options: 'i' } }
        ]
    } : {}  // if no search query then empty object

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } }); // find all users except the logged in user
    res.send(users);
})

module.exports = { registerUser, authUser, allUsers }
