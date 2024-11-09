const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const materialSchema = new mongoose.Schema({
    title: String,
    description: String,
    filePath: String, // Path to the uploaded PDF file
    uploadDate: { type: Date, default: Date.now },
  });

const courseSchema = new Schema({
    name: { type: String, required: true, unique: true },
    units: { type: Number, required: true },
    creditScore: { type: Number, required: true },
    user_id:{
        type: String,
        required: true
    },
    materials: [materialSchema], // Store materials for each course
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
