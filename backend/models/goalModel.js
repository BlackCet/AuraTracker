const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Goals', goalsSchema);
