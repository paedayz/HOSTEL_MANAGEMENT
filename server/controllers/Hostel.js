const fs = require('fs')
const path = require('path')

// Model
const Hostel = require('../models/Hostel')
const Booking = require('../models/Booking')

exports.getHostelDetail = (req, res) => {
    const hostel_id = req.params.hostelId
    Hostel.findById(hostel_id, (err, hostel) => {
        if(err) {
            res.status(500).json({error: err})
        } else {
            if(hostel) {
                res.status(200).json({data: hostel})
            } else {
                res.status(404).json({error: 'Not found hostel data'})
            }
        }
    })
}

exports.addHostel = (req, res) => {
    const obj = {
        name: req.body.name,
        price: req.body.price,
        detail: req.body.detail,
        location: {
            latitude: req.body.latitude,
            longitude: req.body.longitude
        },
        owner: req.user.username
    }

    Hostel.create(obj, (err, item) => {
        if(err) {
            res.status(304).json({error: err})
        } else {
            res.status(200).json({message: 'Add Hostel Success'})
        }
    })
}

exports.getOwnerUserHostel = (req, res) => {
    const username = req.user.username
    
    Hostel.find({owner: username})
        .then((hostels) => {
            console.log(hostels)
            res.status(200).json({data: hostels})
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({error: err})
        })
}

exports.editHostel = async (req, res) => {
    const username = req.user.username
    const update_data = {}

    if(req.body.name) update_data.name = req.body.name
    if(req.body.detail) update_data.detail = req.body.detail

    let hostel = await Hostel.findById(req.body._id, (err, data) => {
        if(err) {
            res.status(500).json({error: err})
        } else {
            if(data) {
                return data
            } else {
                res.status(404).json({error: 'Not found hostel data'})
            }
        }
    })

    if(hostel.owner == username) {
        Hostel.findOneAndUpdate({_id: req.body._id}, {$set: update_data }, {returnOriginal: false})
            .then((data) => {
                let res_data = {
                    ...data._doc,
                    ...update_data
                }
                res.status(200).json({data: res_data,})
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({error: err})
            })
    } else {
        res.status(403).json({error: 'Permission Denied'})
    }
}

exports.deleteHostel = async (req, res) => {
    const username = req.user.username
    const hostel_id = req.params.hostelId

    let hostel = await Hostel.findById(hostel_id, (err, data) => {
        if(err) {
            res.status(500).json({error: 'Not found hostel data'})
        } else {
            return data
        }
    })

    if(hostel.owner == username) {
        Hostel.deleteOne({_id: hostel_id})
            .then(() => {
                Booking.deleteMany({hostel_id: hostel_id})
                    .then(() => {
                        res.status(200).json({data: hostel_id})
                    })
                    .catch((err) => {
                        console.log(err)
                        res.status(500).json({error: err})
                    })
                
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({error: err})
            })
    } else {
        res.status(403).json({error: 'Permission Denied'})
    }
}

exports.booking = async (req, res) => {
    let username = req.user.username

    let booking_data = {
        booker: username,
        hostel_id: req.body._id
    }

    console.log(booking_data)

    let hostel = await Hostel.findById(req.body._id, (err, data) => {
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
    let username = req.user.username
    let booking_id = req.body.bookingId

    let booking = await Booking.findById(booking_id, (err, data) => {
        if(err) {
            res.status(500).json({error: 'Not found booking data'})
        } else {
            return data
        }
    })

    if(booking) {
        if(booking.booker == username) {
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
    let username = req.user.username

    let booking = await Booking.find({booker: username}, (err, data) => {
        if(err) {
            res.status(500).json({error: 'Not found booking data'})
        } else {
            if(data.length != 0) {
                return data
            } else {
                res.status(200).json({data: []})
                return false
            }
            
        }
    })

    if(booking) {
        let booking_promise = booking.map((book) => {
            return Hostel.findById(book.hostel_id).then((hostel) => {
                let merge_booking_hostel = {
                    booker: book.booker,
                    hostel_id: book.hostel_id,
                    created_at: book.created_at,
                    booking_id: book._id,
                    name: hostel.name,
                    price: hostel.price,
                    detail: hostel.detail,
                    location: hostel.location,
                    owner: hostel.owner
                }

                return merge_booking_hostel
            })
        })

        let res_booking_data = await Promise.all(booking_promise)

        res.status(200).json({data: res_booking_data})
    }
}