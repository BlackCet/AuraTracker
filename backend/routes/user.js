// Initialize express router
const express = require('express')
const requireAuth = require('../middleware/requireAuth')

//controller functions
const { signupUser, loginUser, getUserData } = require('../controllers/userController')

const router = express.Router()

//login route
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)

//get user data route
router.get('/me',requireAuth, getUserData)

module.exports = router