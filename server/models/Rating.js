const mongoose = require('mongoose')

const RatingSchema = mongoose.Schema({
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
    rate: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('rating', RatingSchema)