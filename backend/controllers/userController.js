const User = require('../models/userModel')

//login user
const loginUser = async (req, res) => {
    res.json({msg: 'Login user'})
}

//signup user
const signupUser = async (req, res) => {
    res.json({msg: 'Signup user'})
}

module.exports = {loginUser, signupUser}