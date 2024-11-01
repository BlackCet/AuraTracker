const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    completed: { type: Boolean, required: true, default: false },
    deadline: { type: Date, required: false },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentSchema);