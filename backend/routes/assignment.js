const express = require('express');
const router = express.Router();
const { createAssignment, getAssignments, getAssignment, deleteAssignment, updateAssignment } = require('../controllers/assignmentController');

// GET all assignments
router.get('/', getAssignments);

// GET a single assignment by ID
router.get('/:id', getAssignment);

// POST (create) a new assignment
router.post('/', createAssignment);

// DELETE an assignment by ID
router.delete('/:id', deleteAssignment);

// PATCH (update) an assignment by ID
router.patch('/:id', updateAssignment);

module.exports = router;
