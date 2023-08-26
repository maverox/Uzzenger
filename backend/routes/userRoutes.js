const express = require('express');
const { registerUser, authUser} = require('../controllers/userControllers')
const router = express.Router();

// api endpoint after the /api/user/
router.route('/').post(registerUser) //registerUser is a handler 

//create a route for login for which middleware is authUser in userControllers.js
router.route('/login').post(authUser)


// api endpoint after the /api/user/login
// router.post('/login', authUser)


module.exports = router;