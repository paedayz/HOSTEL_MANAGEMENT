const express = require('express')
const router = express.Router()
const UserAuth = require('../middlewares/UserAuth')
const {register, login, editProfile} = require('../controllers/Auth')

// Router
router.post('/register', register)
router.post('/login', login)
router.post('/editProfile',UserAuth, editProfile)

module.exports = router