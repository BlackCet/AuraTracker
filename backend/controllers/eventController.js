// eventController.js
const Event = require('../models/eventModel');

// GET all events for the authenticated user
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({ user_id: req.user._id });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST (create) an event for the authenticated user
const createEvent = async (req, res) => {
  const user_id = req.user._id;
  const { title, start, end } = req.body;

  const newEvent = new Event({ title, start, end, user_id });

  try {
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// PATCH (update) an event for the authenticated user
const updateEvent = async (req, res) => {
  const { title, start, end } = req.body;
  const eventId = req.params.id;

  try {
    const updatedEvent = await Event.findOneAndUpdate(
      { _id: eventId, user_id: req.user._id },
      { title, start, end },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found or not authorized' });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE an event for the authenticated user
const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findOneAndDelete({ _id: req.params.id, user_id: req.user._id });

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found or not authorized' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
