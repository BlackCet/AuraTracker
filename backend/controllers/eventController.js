const Event = require('../models/eventModel');

// GET all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST (create) an event
const createEvent = async (req, res) => {
  const { title, start, end } = req.body;
  const newEvent = new Event({ title, start, end });

  try {
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// PATCH (update) an event
const updateEvent = async (req, res) => {
  const { title, start, end } = req.body;
  const eventId = req.params.id;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { title, start, end },
      { new: true, runValidators: true } // runValidators to ensure data integrity
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE an event
const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(204).send(); // No content to send back
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
