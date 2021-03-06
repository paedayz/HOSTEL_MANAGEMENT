// Model
const Hostel = require('../models/Hostel')
const Booking = require('../models/Booking')
const Rating = require('../models/Rating')
const User = require('../models/User')

exports.getAllHostelList = (req, res) => {
    Hostel.find((err, hostels) => {
        if(err) {
            res.status(500).json({error: err})
        } else {
            if(hostels.length != 0) {
                res.status(200).json({data: hostels})
            } else {
                res.status(404).json({error: 'Not found hostel data'})
            }
        }
    })
}

exports.getAllAvailableHostelList = (req, res) => {
    const user_id = req.user._id
    Hostel.find({status: 'Open', admin_approve: true}, async (err, hostels) => {
        if(err) {
            res.status(500).json({error: err})
        } else {
            if(hostels.length != 0) {
                const res_promise = await hostels.map(async(item) => {
                    let return_data = await checkBooking(user_id, item._id, item)
                    return return_data
                })

                Promise.all(res_promise)
                    .then((data) => {
                        res.status(200).json({data: data})
                    })
                    .catch((err) => {
                        res.status(403).json({error: 'Something went wrong'})
                    })
                
            } else {
                res.status(200).json({data: []})
            }
        }
    })
}

exports.getHostelDetail = (req, res) => {
    const user_id = req.user._id
    const hostel_id = req.params.hostelId
    Hostel.findById(hostel_id, async (err, hostel) => {
        if(err) {
            res.status(500).json({error: err})
        } else {
            if(hostel && hostel.owner === req.user.username) {
                let res_data = await checkBooking(user_id, hostel._id, hostel)
                let owner_data = await User.findOne({username: hostel.owner})

                Booking.find({hostel_id: hostel._id}).populate('booker')
                                            .exec((err, data) => {
                                                owner_data.password = null
                                                owner_data.status = 'user'
                                                owner_data._id = null
                                                res_data.owner_data = owner_data
                                                if(data) {
                                                    data.map((item, index) => {
                                                        item.booker.password = 'SECRET'
                                                        data[index] = item
                                                    })
                                                    res.status(200).json({data: res_data, user_booking: data})
                                                } else {
                                                    res.status(200).json({data: res_data})
                                                }
                                            })
                
            } else if(hostel && hostel.owner !== req.user.username) {
                let res_data = await checkBooking(user_id, hostel._id, hostel)
                let owner_data = await User.findOne({username: hostel.owner})
                                        .then((data) => {
                                            data.password = null
                                            data.status = 'user'
                                            data._id = null
                                            return data
                                        })
                let final_res_data = res_data
                final_res_data.owner_data = owner_data
                res.status(200).json({data: final_res_data})
            } else {
                res.status(404).json({error: 'Not found hostel data'})
            }
        }
    })
}

const checkBooking = async (user_id, hostel_id, item) => {
    let return_data = await Booking.find({booker: user_id, hostel_id: hostel_id})
                        .then( async (data) => {
                            let hostel_rating = await Rating.find({hostel_id: hostel_id})
                                .then((rating_data) => {
                                    if(rating_data.length > 0) {
                                        let rating_sum = 0
                                        rating_data.map((rating) => {
                                            rating_sum = rating_sum + rating.rate
                                        })
                                        let rating_avg = rating_sum / rating_data.length

                                        return {hostel_rating : rating_avg.toString(), hostel_visiting: rating_data.length}
                                    } else {
                                        return {hostel_rating : 0, hostel_visiting: 0}
                                    }
                                })
                            if(hostel_rating) {
                                if(data.length > 0) {
                                    let new_data = {
                                        location: item.location,
                                        status: item.status,
                                        admin_approve: item.admin_approve,
                                        image: item.image,
                                        _id: item._id,
                                        name: item.name,
                                        price: item.price,
                                        detail: item.detail,
                                        owner: item.owner,
                                        is_booking: true,
                                        booking_id: data[0]._id,
                                        tag: item.tag,
                                        check_in: data[0].check_in,
                                        check_out: data[0].check_out,
                                        hostel_rating: hostel_rating.hostel_rating,
                                        hostel_visiting: hostel_rating.hostel_visiting,
                                    }
                                    return new_data
                                } else {
                                    
                                    let new_data = {
                                        location: item.location,
                                        status: item.status,
                                        admin_approve: item.admin_approve,
                                        image: item.image,
                                        _id: item._id,
                                        name: item.name,
                                        price: item.price,
                                        detail: item.detail,
                                        owner: item.owner,
                                        is_booking: false,
                                        booking_id: null,
                                        tag: item.tag,
                                        hostel_rating: hostel_rating.hostel_rating,
                                        hostel_visiting: hostel_rating.hostel_visiting,
                                    }
                                    return new_data
                                }
                            }
                            
                        })
                        .catch((err) => {
                            console.log(err)
                            res.status(403).json({error: 'Something went wrong'})
                        })
    return return_data
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
        image: req.body.image,
        owner: req.user.username,
        tag: req.body.tag
    }

    Hostel.create(obj, (err, item) => {
        if(err) {
            res.status(304).json({error: err})
        } else {
            res.status(200).json({data: item})
        }
    })
}

exports.getOwnerUserHostel = (req, res) => {
    const username = req.user.username
    
    Hostel.find({owner: username})
        .then((hostels) => {
            let bookingPromise = hostels.map( async (hostel) => {
                let booking_amount = await Booking.find({hostel_id: hostel._id})
                        .then((data) => {
                            return {booking_amount: data.length, hostel_id: hostel._id}
                        })
                return booking_amount
            })

            Promise.all(bookingPromise)
                .then((data) => {
                    let res_data = []
                    hostels.map((hostel, index) => {
                        data.map((item) => {
                            if(hostel._id === item.hostel_id) {
                                let buff = {
                                    location: hostel.location,
                                    status: hostel.status,
                                    admin_approve: hostel.admin_approve,
                                    image: hostel.image,
                                    _id: hostel._id,
                                    name: hostel.name,
                                    price: hostel.price,
                                    detail: hostel.detail,
                                    owner: hostel.owner,
                                    tag: hostel.tag,
                                    booking_amount: item.booking_amount
                                }
                                res_data.push(buff)
                            }
                        })
                    })
                    res.status(200).json({data: res_data})
                })
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
    if(req.body.price) update_data.price = req.body.price
    if(req.body.latitude) update_data.latitude = req.body.latitude
    if(req.body.longitude) update_data.longitude = req.body.longitude
    if(req.body.tag) update_data.tag = req.body.tag


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
                res.status(200).json({data: res_data})
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
    const user_status = req.user.status
    const hostel_id = req.params.hostelId

    let hostel = await Hostel.findById(hostel_id, (err, data) => {
        if(err) {
            res.status(500).json({error: 'Not found hostel data'})
        } else {
            return data
        }
    })

    if(hostel.owner == username || user_status == 'admin') {
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

exports.setHostelStatus = async (req, res) => {
    let username = req.user.username
    let status = req.body.status

    let hostel = await Hostel.findById(req.body._id, (err, data) => {
        if(err) {
            res.status(500).json({error: 'Not found hostel data'})
            return false
        } else {
            return data
        }
    })

    if(hostel.owner == username) {
        Hostel.findOneAndUpdate({_id: req.body._id}, {$set: {status: status} }, {returnOriginal: false})
            .then((data) => {
                let res_data = {
                    ...data._doc,
                    status: status
                }
                res.status(200).json({data: res_data})
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({error: err})
            })
    } else {
        res.status(403).json({error: 'Permission Denied'})
    }
}

exports.adminApproveHostelRequest = async (req, res) => {
    let user_status = req.user.status
    let admin_approve = req.body.admin_approve

    if(user_status == 'admin') {
        Hostel.findOneAndUpdate({_id: req.body._id}, {$set: {admin_approve: admin_approve} }, {returnOriginal: false})
            .then((data) => {
                let res_data = {
                    ...data._doc,
                    admin_approve: admin_approve
                }
                res.status(200).json({data: res_data})
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({error: err})
            })
    } else {
        res.status(403).json({error: 'Permission Denied'})
    }
}

exports.searchAPI = async (req, res) => {
    const user_id = req.user._id
    const search_term = req.params.search_term

    Hostel.find({status: 'Open', admin_approve: true}, async (err, hostels) => {
        if(err) {
            res.status(500).json({error: err})
        } else {
            if(hostels.length != 0) {
                const res_promise = await hostels.map(async(item) => {
                    let return_data = await checkBooking(user_id, item._id, item)
                    return return_data
                })

                Promise.all(res_promise)
                    .then((data) => {
                        let res_data = data.filter((val) => {
                            let tag_match_flag = 0
                            if(val.tag) {
                                val.tag.map((tag) => {
                                    if(tag.toLocaleLowerCase().includes(search_term.toLocaleLowerCase())){
                                        tag_match_flag = 1
                                    }
                                })
                            }
                            
                            if (
                                val.name.toLocaleLowerCase().includes(search_term.toLocaleLowerCase()) || 
                                (val.detail.toLocaleLowerCase().includes(search_term.toLocaleLowerCase())) || 
                                tag_match_flag === 1
                               ) {
                                return val
                              } else {
                                return ''
                              }
                        })

                        res.status(200).json({data: res_data})
                    })
                    .catch((err) => {
                        res.status(403).json({error: 'Something went wrong'})
                    })
                
            } else {
                res.status(200).json({data: []})
            }
        }
    })
}

exports.rating = (req, res) => {
    const obj = {
        rate : req.body.rating,
        hostel_id: req.body.hostel_id,
        booker : req.user._id
    }

    Rating.create(obj, (err, item) => {
        if(err) {
            res.status(304).json({error: err})
        } else {
            Booking.deleteOne({_id: req.body.booking_id})
                .then( async() => {
                    let hostel_rating = await Rating.find({hostel_id: req.body.hostel_id})
                                .then((rating_data) => {
                                    if(rating_data.length > 0) {
                                        let rating_sum = 0
                                        rating_data.map((rating) => {
                                            rating_sum = rating_sum + rating.rate
                                        })
                                        let rating_avg = rating_sum / rating_data.length

                                        return rating_avg.toString()
                                    } else {
                                        return "0"
                                    }
                                })
                    res.status(200).json({data: req.body.booking_id, rating:hostel_rating})
                })
        }
    })
}