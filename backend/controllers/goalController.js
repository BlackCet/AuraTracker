const Goal = require('../models/goalModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');
const { awardXP } = require("../services/xpService");


// Add a new goal
const addGoal = async (req, res) => {
    const { title, priority = 'Medium' } = req.body;

    try {
        const user_id = req.user._id;
        
        // Check for existing goal with the same title for the user
        const existingGoal = await Goal.findOne({ title, user_id });
        if (existingGoal) {
            return res.status(409).json({ message: "A goal with this title already exists." });
        }

        const goal = await Goal.create({ title, priority, completed: false, user_id });
        res.status(201).json(goal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all goals for the logged-in user
const getGoals = async (req, res) => {
    try {
        const user_id = req.user._id;
        const goals = await Goal.find({ user_id }).sort({ createdAt: -1 });
        res.status(200).json(goals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single goal by ID
const getGoal = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Invalid goal ID" });
    }

    try {
        const goal = await Goal.findById(id);
        if (!goal) {
            return res.status(404).json({ message: "Goal not found" });
        }
        res.status(200).json(goal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateGoal = async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body; // Only allow `completed` field to be updated

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Invalid goal ID" });
    }

    try {
        const currentGoal = await Goal.findById(id);

        if (completed === undefined || currentGoal.completed === completed) {
            return res.status(400).json({ message: "No changes detected or invalid request." });
        }

        let pointsChange = 0;
        let goalsCompletedChange = 0;

        // Update points and goals completed status based on completed field
        if (!currentGoal.completed && completed) {
            pointsChange = 5;
            goalsCompletedChange = 1;

            // Award XP for completing a goal
            const xpEarned = 20; // Adjust based on your XP rewards system
            const result = await awardXP(req.user._id, xpEarned);
            
        } else if (currentGoal.completed && !completed) {
            pointsChange = -5;
            goalsCompletedChange = -1;
        }

        const updatedGoal = await Goal.findByIdAndUpdate(id, { completed }, { new: true });
        if (!updatedGoal) {
            return res.status(404).json({ message: "Goal not found" });
        }

        const user = await User.findById(req.user._id);
        user.points += pointsChange;
        user.goalsCompleted = (user.goalsCompleted || 0) + goalsCompletedChange;

        // Assign badges based on goals completed
        if (user.goalsCompleted === 5 && !user.badges.includes("Goal Setter")) {
            user.badges.push("Goal Setter");
        } else if (user.goalsCompleted === 10 && !user.badges.includes("Goal Achiever")) {
            user.badges.push("Goal Achiever");
        }

        await user.save();

        res.status(200).json(updatedGoal);
    } catch (error) {
        console.error("Error updating goal:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete a goal
const deleteGoal = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Invalid goal id" });
    }
    const goal= await Goal.findOneAndDelete({ _id: id });
    if (!goal) {
        return res.status(404).json({ message: "Goal not found" });
    }
    res.status(200).json(goal);
};

module.exports = { addGoal, getGoals, getGoal, updateGoal, deleteGoal };
