const mongoose = require('mongoose');

const DetailsSchema = new mongoose.Schema({
    input: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Details', DetailsSchema);