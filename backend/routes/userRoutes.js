const express = require('express');
const { registerUser, authUser, allUsers} = require('../controllers/userControllers');
const { protect } = require('../middleware/authMiddlerware');
const router = express.Router();

// api endpoint after the /api/user/
router.route('/').post(registerUser) //registerUser is a handler 
//tosearch for all users
router.route('/').get(protect, allUsers);
//create a route for login for which middleware is authUser in userControllers.js
router.route('/login').post(authUser)


// api endpoint after the /api/user/login
// router.post('/login', authUser)


module.exports = router;