const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: false,
    },
    resumeOptimizations: {
        type: Number,
        required: true,
        default: 0,
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
