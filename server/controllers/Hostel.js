const fs = require('fs')
const path = require('path')

// Model
const Hostel = require('../models/Hostel')

exports.addHostel = (req, res, next) => {
    console.log(req.file)
    const obj = {
        name: req.body.name,
        price: req.body.price,
        detail: req.body.detail,
        location: {
            latitude: req.body.latitude,
            longitude: req.body.longitude
        }
    }

    Hostel.create(obj, (err, item) => {
        if(err) {
            res.status(304).json({error: err})
        } else {
            res.status(200).json({message: 'Add Hostel Success'})
        }
    })
}