const mongoose = require('mongoose')

const BookingSchema = mongoose.Schema({
    booker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    hostel_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hostels',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    check_in: {
        type: String,
        required: true
    },
    check_out: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('booking', BookingSchema)