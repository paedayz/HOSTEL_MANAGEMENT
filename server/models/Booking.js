const mongoose = require('mongoose')

const BookingSchema = mongoose.Schema({
    booker: {
        type: String,
        required: true
    },
    hostel_id: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('booking', BookingSchema)