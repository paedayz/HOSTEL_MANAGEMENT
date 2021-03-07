const express = require('express')
const router = express.Router()
const UserAuth = require('../middlewares/UserAuth')

const {
    getHostelDetail,
    addHostel, 
    getOwnerUserHostel, 
    editHostel, 
    deleteHostel, 
    booking, 
    cancelBooking, 
    getBookingList
} = require('../controllers/Hostel')

// Router
router.get('/getHostelDetail/:hostelId', getHostelDetail)
router.post('/addHostel', UserAuth, addHostel)
router.get('/getOwnerUserHostel', UserAuth, getOwnerUserHostel)
router.post('/editHostel', UserAuth, editHostel)
router.delete('/deleteHostel/:hostelId', UserAuth, deleteHostel)
router.post('/booking', UserAuth, booking)
router.post('/cancelBooking', UserAuth, cancelBooking)
router.get('/getBookingList', UserAuth, getBookingList)

module.exports = router