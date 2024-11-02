const express = require('express');
const router = express.Router();
const {
    getAllEvents,
    createEvent,
    updateEvent,
    deleteEvent,
} = require('../controllers/eventController');

// GET all events
router.get('/', getAllEvents);

// POST (create) an event
router.post('/', createEvent);

// PATCH (update) an event
router.patch('/:id', updateEvent);

// DELETE an event
router.delete('/:id', deleteEvent);

module.exports = router;