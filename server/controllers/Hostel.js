const fs = require('fs')
const path = require('path')

// Model
const Hostel = require('../models/Hostel')

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