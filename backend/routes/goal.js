const express = require('express');
const { addGoal, getGoals, getGoal, updateGoal, deleteGoal } = require('../controllers/goalController');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

// GET all courses
router.get('/', getGoals);

// GET a course
router.get('/:id', getGoal);

// POST(create) a course
router.post('/', addGoal);

// DELETE a course
router.delete('/:id', deleteGoal);

// PATCH(update) a course
router.patch('/:id', updateGoal);

module.exports = router;
