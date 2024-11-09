const Goals = require('../models/goalModel');

//add a goal
const addGoal = async (req, res) => {
    const { title, priority } = req.body;

    try {
        const goal = await Goals.create({ title, priority });
        res.status(201).json(goal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//get all goals
const getGoals = async (req, res) => {
    try {
        const goals = await Goals.find().sort({ createdAt: 1 });
        res.status(200).json(goals);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//get a goal
const getGoal = async (req, res) => {
    const { id } = req.params;

    try {
        const goal = await Goals.findById(id);
        res.status(200).json(goal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//update a goal
const updateGoal = async (req, res) => {
    const { id } = req.params;

    try {
        const goal = await Goals.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(goal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//delete a goal
const deleteGoal = async (req, res) => {
    const { id } = req.params;

    try {
        const goal = await Goals.findByIdAndDelete(id);
        res.status(200).json({ message: 'Goal deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = { addGoal, getGoals, updateGoal, deleteGoal, getGoal };
