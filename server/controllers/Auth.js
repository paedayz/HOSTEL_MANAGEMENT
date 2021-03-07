const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Model
const User = require('../models/User')

exports.register = async (req, res, next) => {
    let same_username = await User.findOne({username: req.body.username})
                                .then((user) => {
                                    if(user) {
                                        return true
                                    } else {
                                        return false
                                    }
                                })

    let same_email = await User.findOne({email: req.body.email})
                                .then((user) => {
                                    if(user) {
                                        return true
                                    } else {
                                        return false
                                    }
                                })
    
    if(!same_email && !same_username) {
        bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
            if(err) {
                res.json({error: err})
            }
    
            let user = new User({
                email: req.body.email,
                password: hashedPass,
                username: req.body.username,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                date_of_birth: new Date(req.body.date_of_birth)
            })
    
            user.save()
                .then((user) => {
                    res.json({
                        message:'User Added Successfully'
                    })
                })
                .catch((err) => {
                    res.json({
                        message: 'An error occured'
                    })
                })
        })
    } else if(same_email) {
        return res.status(400).json({message: "This email is already taken"})
    } else {
        return res.status(400).json({message: "This username is already taken"})
    }
    
}

exports.login = (req, res, next) => {
    let email_username = req.body.email_username
    let password = req.body.password

    User.findOne({$or: [{email: email_username}, {username: email_username}]})
        .then((user) => {
            if(user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if(err) {
                        res.json({
                            error: err
                        })
                    }

                    if(result) {
                        let token = jwt.sign({profile: user}, 'verySecretValue', {expiresIn: '1h'})
                        res.json({
                            message:'Login Successful!',
                            token
                        })
                    } else {
                        res.json({
                            message: 'Password does not matched!'
                        })
                    }
                })
            } else {
                res.json({
                    message: 'No user found!'
                })
            }
        })
}