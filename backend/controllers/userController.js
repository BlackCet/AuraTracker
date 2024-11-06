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
            user, // Return the full user object
            token
        });
    } catch (error) {
        console.error('Login Error:', error.message);
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
            user, // Return the full user object
            token
        });

    } catch (error) {
        console.error('Signup Error:', error.message);
        res.status(400).json({ error: error.message });
    }
};


// Get user data
const getUserData = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json(user); // Return full user data

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


// Update user profile
const updateUser = async (req, res) => {
    try {
        const { username, profilePicture } = req.body;
        const userId = req.user._id;

        const updates = {};
        if (username) updates.username = username;
        if (profilePicture) updates.profilePicture = profilePicture;

        const updatedUser = await User.findByIdAndUpdate(userId, updates, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ error: "Failed to update profile" });
    }
};

module.exports = { loginUser, signupUser, getUserData, updateUser, getLeaderboard };

