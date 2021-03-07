const express = require('express')
const router = express.Router()
const UserAuth = require('../middlewares/UserAuth')
const {addHostel} = require('../controllers/Hostel')

// Router
router.post('/addHostel', UserAuth, addHostel)

module.exports = router