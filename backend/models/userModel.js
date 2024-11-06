// In userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true // Allows null values while enforcing uniqueness
    },
    points: {
        type: Number,
        default: 0 // Initialize points to zero
    },
    profilePicture: {
        type: String,
        default: "defaultProfilePic.png" // Default to empty string if no profile picture is provided
    }
});


// Static signup method
userSchema.statics.signup = async function(email, password, username) {
    if (!email || !password || !username) {
        throw new Error('All fields must be filled.');
    }

    if (!validator.isEmail(email)) {
        throw new Error('Invalid email');
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error('Password not strong enough');
    }

    const emailExists = await this.findOne({ email });
    const usernameExists = await this.findOne({ username });

    if (emailExists) {
        throw new Error('Email already in use');
    }

    if (usernameExists) {
        throw new Error('Username already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash, username });

    return user;
};

// Static login method
userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw new Error('All fields must be filled');
    }

    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('Incorrect email');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Incorrect password');
    }

    return user;
};

userSchema.statics.loginWithGoogle = async function(googleId, email, username) {
    if (!googleId || !email) {
        throw new Error('Google ID and email are required');
    }

    // Check if the user already exists based on googleId
    let user = await this.findOne({ googleId });

    // If the user exists, return it
    if (user) {
        return user;
    }

    // If the user does not exist, check if the email is already in use
    const existingUser = await this.findOne({ email });
    if (existingUser) {
        // If email already exists but with a different Google ID
        existingUser.googleId = googleId; // Link Google ID to existing user
        await existingUser.save();
        return existingUser;
    }

    // Create a new user if not found
    // If username is not provided, set a default or generate one
    if (!username) {
        username = email.split('@')[0]; // Default to the email prefix if no username is given
    }

    user = await this.create({ googleId, email, username });
    return user;
};

module.exports = mongoose.model('User', userSchema);