const express = require('express')
const router = express.Router()
const uploadImage = require('../middlewares/UploadImage')
const {addHostel} = require('../controllers/Hostel')

// Router
router.post('/addHostel', addHostel)

module.exports = router