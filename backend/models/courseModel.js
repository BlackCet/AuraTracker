const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: { type: String, required: true, unique: true },
    units: { type: Number, required: true },
    creditScore: { type: Number, required: true },
    user_id:{
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
