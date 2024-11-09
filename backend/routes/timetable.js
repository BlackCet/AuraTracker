const express = require('express');
const {
  createOrUpdateTimetable,
  getTimetable,
} = require('../controllers/timetableController');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');

// Protect all routes with requireAuth middleware
router.use(requireAuth);

// Route to create or update a timetable (using PUT for idempotent behavior)
router.put('/', createOrUpdateTimetable);

// Route to get the timetable
router.get('/', getTimetable);

module.exports = router;
