const express = require('express')
const router = express.Router()
const UserAuth = require('../middlewares/UserAuth')

const {
    booking,
    cancelBooking,
    getBookingList
} = require('../controllers/Booking')

router.post('/booking', UserAuth, booking) //
router.post('/cancelBooking', UserAuth, cancelBooking)//
router.get('/getBookingList', UserAuth, getBookingList)//

module.exports = router