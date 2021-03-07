const express = require('express')
const router = express.Router()
const {register} = require('../controllers/Auth')

// Router
router.post('/register', register)
// router.post('/login', login)

module.exports = router