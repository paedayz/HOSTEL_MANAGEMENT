const express = require('express')
const router = express.Router()
const UserAuth = require('../middlewares/UserAuth')
const {addHostel, getOwnerUserHostel, editHostel, deleteHostel, booking, cancelBooking} = require('../controllers/Hostel')

// Router
router.post('/addHostel', UserAuth, addHostel)
router.get('/getOwnerUserHostel', UserAuth, getOwnerUserHostel)
router.post('/editHostel', UserAuth, editHostel)
router.delete('/deleteHostel/:hostelId', UserAuth, deleteHostel)
router.post('/booking', UserAuth, booking)
router.post('/cancelBooking', UserAuth, cancelBooking)

module.exports = router