const express = require('express');
const { createCourse, getCourses, getCourse, deleteCourse, updateCourse } = require('../controllers/courseController');
const router = express.Router();

// GET all courses
router.get('/', getCourses);

// GET a course
router.get('/:id', getCourse);

// POST(create) a course
router.post('/', createCourse);

// DELETE a course
router.delete('/:id', deleteCourse);

// PATCH(update) a course
router.patch('/:id', updateCourse);

module.exports = router;
