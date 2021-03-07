const express = require('express')
const router = express.Router()
const UserAuth = require('../middlewares/UserAuth')
const {addHostel, getOwnerUserHostel, editHostel} = require('../controllers/Hostel')

// Router
router.post('/addHostel', UserAuth, addHostel)
router.get('/getOwnerUserHostel', UserAuth, getOwnerUserHostel)
router.post('/editHostel', UserAuth, editHostel)

module.exports = router