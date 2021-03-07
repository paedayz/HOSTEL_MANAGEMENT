const mongoose = require('mongoose')

const HostelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    location: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    owner: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'available'
    },
    admin_approve: {
        type: Boolean,
        default: false
    },
})

module.exports = mongoose.model('hostels', HostelSchema)