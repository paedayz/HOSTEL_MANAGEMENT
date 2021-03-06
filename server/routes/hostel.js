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
    setHostelStatus,
    adminApproveHostelRequest,
    searchAPI,
    rating
} = require('../controllers/Hostel')

// Router
router.get('/getAllHostelList', getAllHostelList)
router.get('/getAllAvailableHostelList',UserAuth, getAllAvailableHostelList)
router.get('/getHostelDetail/:hostelId',UserAuth, getHostelDetail)
router.post('/addHostel', UserAuth, addHostel)
router.get('/getOwnerUserHostel', UserAuth, getOwnerUserHostel)
router.post('/editHostel', UserAuth, editHostel)
router.delete('/deleteHostel/:hostelId', UserAuth, deleteHostel)
router.post('/setHostelStatus', UserAuth, setHostelStatus)
router.post('/adminApproveHostelRequest', UserAuth, adminApproveHostelRequest)
router.get('/searchAPI/:search_term', UserAuth, searchAPI)
router.post('/rating', UserAuth, rating)

module.exports = router