const express = require('express');
const { registerUser, authUser} = require('../controllers/userControllers')
const router = express.Router();
router.use(express.json())

// api endpoint after the /api/user/
router.route('/').post(registerUser) //registerUser is a handler 

//api endpoint for login
router.route('/login', authUser);


// api endpoint after the /api/user/login
// router.post('/login', authUser)


module.exports = router;