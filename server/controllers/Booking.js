// Model
const Hostel = require('../models/Hostel')
const Booking = require('../models/Booking')
const Rating = require('../models/Rating')
const User = require('../models/User')

exports.booking = async (req, res) => {
    let booker_id = req.user._id

    let booking_data = {
        booker: booker_id,
        hostel_id: req.body.hostel_id,
        check_in: req.body.check_in,
        check_out: req.body.check_out,
    }

    let hostel = await Hostel.findById(req.body.hostel_id, (err, data) => {
        if(err) {
            res.status(500).json({error: 'Not found hostel data'})
        } else {
            return data
        }
    })

    if(hostel) {
        Booking.create(booking_data, (err, item) => {
            if(err) {
                res.status(304).json({error: err})
            } else {
                res.status(200).json({data: item})
            }
        })
    }
}

exports.cancelBooking = async (req, res) => {
    let user_id = req.user._id
    let booking_id = req.body.bookingId

    let booking = await Booking.findById(booking_id, (err, data) => {
        if(err) {
            res.status(500).json({error: 'Not found booking data'})
        } else {
            return data
        }
    })

    if(booking) {
        if(booking.booker == user_id) {
            Booking.deleteOne({_id: booking_id})
                .then(() => {
                    res.status(200).json({data: booking_id})
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json({error: err})
                })
        } else {
            res.status(403).json({error: 'Permission Denied'})
        }
    }
}

exports.getBookingList = async (req, res) => {
    let booker_id = req.user._id

    Booking.find({booker: booker_id}).populate('booker').populate('hostel_id')
                            .exec((err, data) => {
                                if(err) {
                                    res.status(500).json({error: 'Not found booking data'})
                                } else {
                                    if(data.length != 0) {
                                        data.map((item, index) => {
                                            item.booker.password = 'SECRET'
                                            data[index] = item
                                        })
                                        res.status(200).json({data: data})
                                    } else {
                                        res.status(200).json({data: []})
                                    }
                                    
                                }
                            })
}