// eventRoutes.js
const express = require('express');
const {
    getAllEvents,
    createEvent,
    updateEvent,
    deleteEvent,
} = require('../controllers/eventController');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');

// Protect all routes with requireAuth middleware
router.use(requireAuth);

// GET all events
router.get('/', getAllEvents);

// POST (create) an event
router.post('/', createEvent);

// PATCH (update) an event
router.patch('/:id', updateEvent);

// DELETE an event
router.delete('/:id', deleteEvent);

module.exports = router;
