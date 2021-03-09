const express = require('express')
const router = express.Router()
const UserAuth = require('../middlewares/UserAuth')

const {
    getAllHostelList,
    getAllAvailableHostelList,
    getHostelDetail,
    addHostel, 
    getOwnerUserHostel, 
    editHostel, 
    deleteHostel, 
    booking, 
    cancelBooking, 
    getBookingList,
    setHostelStatus,
    adminApproveHostelRequest,
    searchAPI
} = require('../controllers/Hostel')

// Router
router.get('/getAllHostelList', getAllHostelList)
router.get('/getAllAvailableHostelList',UserAuth, getAllAvailableHostelList)
router.get('/getHostelDetail/:hostelId',UserAuth, getHostelDetail)
router.post('/addHostel', UserAuth, addHostel)
router.get('/getOwnerUserHostel', UserAuth, getOwnerUserHostel)
router.post('/editHostel', UserAuth, editHostel)
router.delete('/deleteHostel/:hostelId', UserAuth, deleteHostel)
router.post('/booking', UserAuth, booking)
router.post('/cancelBooking', UserAuth, cancelBooking)
router.get('/getBookingList', UserAuth, getBookingList)
router.post('/setHostelStatus', UserAuth, setHostelStatus)
router.post('/adminApproveHostelRequest', UserAuth, adminApproveHostelRequest)
router.get('/searchAPI/:search_term', UserAuth, searchAPI)

module.exports = router