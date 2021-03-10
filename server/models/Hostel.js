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
    image : {
        type: String,
        default: 'https://image.freepik.com/free-vector/house-building-vector-icon-illustration_138676-208.jpg' 
    },
    tag : [
        {
            type: String,
            required: true,
        }
    ]
})

module.exports = mongoose.model('hostels', HostelSchema)