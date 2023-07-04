const mongoose = require('mongoose');

const MissionsSchema = new mongoose.Schema({
    first: {
        type: String,
        required: true,
    },
    second: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    check: {
        type: String,
    },
    third: {
        type: Array,
        required: true,
    },
    date: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('missions', MissionsSchema);