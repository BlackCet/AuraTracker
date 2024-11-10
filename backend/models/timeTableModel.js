const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  monday: { type: [String], default: [], validate: [arrayLimit, '{PATH} exceeds the limit of 5'] },
  tuesday: { type: [String], default: [], validate: [arrayLimit, '{PATH} exceeds the limit of 5'] },
  wednesday: { type: [String], default: [], validate: [arrayLimit, '{PATH} exceeds the limit of 5'] },
  thursday: { type: [String], default: [], validate: [arrayLimit, '{PATH} exceeds the limit of 5'] },
  friday: { type: [String], default: [], validate: [arrayLimit, '{PATH} exceeds the limit of 5'] },
});

// Validator function to limit the array length
function arrayLimit(val) {
  return val.length <= 5; // Assuming a maximum of 5 periods per day
}

const Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = Timetable;
