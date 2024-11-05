const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Create a token function
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({ 
            email: user.email,
            username: user.username,
            points: user.points,
            token 
        });
    } catch (error) {
        console.error('Login Error:', error.message); // Log error for debugging
        res.status(400).json({ error: error.message });
    }
};

// Signup user
const signupUser = async (req, res) => {
    const { email, password, username } = req.body;
    try {
        const user = await User.signup(email, password, username);
        const token = createToken(user._id);
        res.status(201).json({ 
            email: user.email,
            username: user.username,
            points: user.points,
            token 
        }); // Use 201 status for resource creation
    } catch (error) {
        console.error('Signup Error:', error.message); // Log error for debugging
        res.status(400).json({ error: error.message });
    }
};

//to get user data
const getUserData = async (req, res) => {
    try {
        const { _id, username, email, points } = req.user; // Destructure the required fields
        res.status(200).json({ _id, username, email, points }); // Send the desired fields in the response
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

//to get the user info for leaderboard
const getLeaderboard = async (req, res) => {
    try {
        const users = await User.find({ points: { $gt: 0 } }) // Fetch users with more than 10 points
        .sort({ points: -1 })
        .select('username points'); // Fetches users with username and points only
          res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching leaderboard", error });
    }
  };

module.exports = { loginUser, signupUser, getUserData, getLeaderboard };