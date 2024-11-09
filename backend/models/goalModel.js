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
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Goals', goalsSchema);
