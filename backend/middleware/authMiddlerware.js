// write a middleware to authorize the user on the backend before accessing the protected routes

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
    let token;
    // console.log(req.headers.authorization)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1] // split the token from the Bearer keyword and get the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify the token synchronously and get the decoded token which contains the user id
            // console.log(decoded) this was used to change the below line decoded.id to decoded.key to debug the error
            req.user = await User.findById(decoded.key).select('-password'); // get the user from the database and store it in the req.user object

            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not Authorized, Token Failed')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Not Authorized, No Token')
    }
})

module.exports = { protect };


//
// Then import the protect middleware in backend/routes/userRoutes.js and add it as a middleware for the following routes:
// router.route('/profile').get(protect, getUserProfile);
// router.route('/').get(protect, allUsers);
// router.route('/:id').delete(protect, deleteUser);
// router.route('/:id').get(protect, getUserById);
// router.route('/update/:id').put(protect, updateUser);