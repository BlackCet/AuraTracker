// timetableController.js
const Timetable = require('../models/timeTableModel');

// GET the timetable for the authenticated user
const getTimetable = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const timetable = await Timetable.findOne({ user_id: req.user._id });

    if (!timetable) {
      return res.status(404).json({ message: 'Timetable not found' });
    }

    res.status(200).json(timetable);
  } catch (error) {
    console.error("Error fetching timetable:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// POST or PATCH (create or update) the timetable for the authenticated user
const createOrUpdateTimetable = async (req, res) => {
  const { monday, tuesday, wednesday, thursday, friday } = req.body;

  // Removed validation for all periods to be filled

  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const userId = req.user._id;
    let timetable = await Timetable.findOne({ user_id: userId });

    if (timetable) {
      timetable.monday = monday || timetable.monday;
      timetable.tuesday = tuesday || timetable.tuesday;
      timetable.wednesday = wednesday || timetable.wednesday;
      timetable.thursday = thursday || timetable.thursday;
      timetable.friday = friday || timetable.friday;
      await timetable.save();
      return res.status(200).json(timetable);
    } else {
      timetable = new Timetable({
        user_id: userId,
        monday: monday || [],
        tuesday: tuesday || [],
        wednesday: wednesday || [],
        thursday: thursday || [],
        friday: friday || [],
      });
      await timetable.save();
      return res.status(201).json(timetable);
    }
  } catch (error) {
    console.error("Error saving timetable:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getTimetable,
  createOrUpdateTimetable,
};
