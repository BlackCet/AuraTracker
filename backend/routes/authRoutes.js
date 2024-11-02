require('dotenv').config();

const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/userModel'); // Adjust path as needed
const jwt = require('jsonwebtoken');

const router = express.Router();

// Initialize Google OAuth client
const client = new OAuth2Client(process.env.CLIENT_ID);

// Google Sign-In route
router.post('/google/callback', async (req, res) => {
    const { token } = req.body;

    console.log("Received token:", token); // Log received token

    try {
        // Verify the Google token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID,
        });
        
        const payload = ticket.getPayload();
        console.log("Token payload:", payload); // Log token payload details

        const { email, sub: googleId, name: username } = payload;

        // Check if the user exists or create a new user
        let user = await User.loginWithGoogle(googleId, email, username);

        // Generate a JWT for the session
        const jwtToken = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '1d' });

        res.status(200).json({ token: jwtToken, user });
    } catch (error) {
        console.error("Google authentication error:", error); // Log detailed error
        res.status(400).json({ error: 'Google authentication failed' });
    }
});


module.exports = router;