const Assignment = require('../models/assignmentModel');
const mongoose = require('mongoose');
const User = require('../models/userModel');

// Get all assignments
const getAssignments = async (req, res) => {
    try {
        const user_id = req.user._id;
        const assignments = await Assignment.find({ user_id }).sort({ createdAt: -1 });
        res.status(200).json(assignments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single assignment
const getAssignment = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Invalid assignment id" });
    }
    const assignment = await Assignment.findById(id);
    if (!assignment) {
        return res.status(404).json({ message: "Assignment not found" });
    }
    res.status(200).json(assignment);
};

// Create a new assignment
const createAssignment = async (req, res) => {
    const { title, description, completed = false, deadline } = req.body; 

    if (!title) {
        return res.status(400).json({ message: "Title is required." });
    }

    try {
        const user_id = req.user._id;
        const existingAssignment = await Assignment.findOne({ title });
        if (existingAssignment) {
            return res.status(409).json({ message: "An assignment with this title already exists." });
        }

        const assignment = await Assignment.create({ title, description, completed, deadline, user_id });
        res.status(201).json(assignment);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ message: "An assignment with this title already exists." });
        }
        res.status(400).json({ message: err.message });
    }
};

// Delete an assignment
const deleteAssignment = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Invalid assignment id" });
    }
    const assignment = await Assignment.findOneAndDelete({ _id: id });
    if (!assignment) {
        return res.status(404).json({ message: "Assignment not found" });
    }
    res.status(200).json(assignment);
};

// Update an assignment
const updateAssignment = async (req, res) => {
    const { id } = req.params;
    const { title, description, completed, deadline } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Invalid assignment ID" });
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (completed !== undefined) updateData.completed = completed;
    if (deadline) updateData.deadline = deadline;

    try {
        const currentAssignment = await Assignment.findById(id);

        // Check if we're marking this assignment as completed
        if (!currentAssignment.completed && completed) {
            // Increment user points if the assignment was not previously completed
            await User.findByIdAndUpdate(
                req.user._id,
                { $inc: { points: 10 } }, // Increment points by 10
                { new: true }
            );
        }

        const updatedAssignment = await Assignment.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedAssignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        res.status(200).json(updatedAssignment);
    } catch (err) {
        console.error("Error updating assignment:", err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { createAssignment, getAssignments, getAssignment, deleteAssignment, updateAssignment };