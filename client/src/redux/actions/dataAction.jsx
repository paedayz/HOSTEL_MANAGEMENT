import axios from 'axios'
import {
    DATA_LOADING, 
    SET_AVAILABLE_HOSTEL, 
    SET_SINGLE_HOSTEL_DETAIL, 
    BOOKING, 
    CANCEL_BOOKING, 
    SET_BOOKING_LIST,
    SET_OWN_HOSTEL,
    DELETE_HOSTEL,
    SET_HOSTEL_STATUS,
    ADD_HOSTEL,
    EDIT_HOSTEL,
    SET_ALL_HOSTEL_LIST,
    APPROVE_REQUEST,
    SET_SEARCH_DATA,
    RATING
} from '../types'

export const getAllAvailableHostelList = () => (dispatch) => {
    dispatch({type: DATA_LOADING})
    axios.get('/hostel/getAllAvailableHostelList')
        .then((res) => {
            dispatch({type: SET_AVAILABLE_HOSTEL, payload: res.data.data})
        })
        .catch((err) => {
            console.log(err)
        })
}

export const getHostelDetail = (hostelId) => (dispatch) => {
    dispatch({type: DATA_LOADING})
    axios.get(`/hostel/getHostelDetail/${hostelId}`)
        .then((res) => {
            dispatch({type: SET_SINGLE_HOSTEL_DETAIL, payload: res.data.data, user_booking: res.data.user_booking})
        })
        .catch((err) => {
            console.log(err)
        })
}

export const booking = (hostelId, checkIn, checkOut) => (dispatch) => {
    dispatch({type: DATA_LOADING})
    axios.post('/booking/booking',{hostel_id : hostelId, check_in: checkIn, check_out: checkOut})
        .then((res) => {
            dispatch({type: BOOKING, payload: res.data.data})
        })
        .catch((err) => {
            console.log(err)
        })
}

export const cancelBooking = (booking_id) => (dispatch) => {
    dispatch({type: DATA_LOADING})
    axios.post('/booking/cancelBooking',{bookingId : booking_id})
        .then((res) => {
            dispatch({type: CANCEL_BOOKING, payload: res.data.data})
        })
        .catch((err) => {
            console.log(err)
        })
}

export const getBookingList = () => (dispatch) => {
    dispatch({type: DATA_LOADING})
    axios.get('/booking/getBookingList')
        .then((res) => {
            dispatch({type: SET_BOOKING_LIST, payload: res.data.data})
        })
        .catch((err) => {
            console.log(err)
        })
}

export const getOwnerUserHostel = () => (dispatch) => {
    axios.get('/hostel/getOwnerUserHostel')
        .then((res) => {
            dispatch({type: SET_OWN_HOSTEL, payload: res.data.data})
        })
        .catch((err) => {
            console.log(err)
        })
}

export const deleteHostel = (hostelId) => (dispatch) => {
    dispatch({type: DATA_LOADING})
    axios.delete(`/hostel/deleteHostel/${hostelId}`)
        .then((res) => {
            dispatch({type: DELETE_HOSTEL, payload: res.data.data})
        })
        .catch((err) => {
            console.log(err)
        })
}

export const setHostelStatus = (hostelId, status) => (dispatch) => {
    dispatch({type: DATA_LOADING})
    axios.post('/hostel/setHostelStatus', {_id: hostelId, status: status})
        .then((res) => {
            const set_data = {
                _id: hostelId,
                status: status
            }
            dispatch({type: SET_HOSTEL_STATUS, payload: set_data})
        })
        .catch((err) => {
            console.log(err)
        })
}

export const addHostel = (add_data) => (dispatch) => {
    dispatch({type: DATA_LOADING})
    axios.post('/hostel/addHostel', {...add_data})
        .then((res) => {
            dispatch({type: ADD_HOSTEL, payload: res.data.data})
        })
        .catch((err) => {
            console.log(err)
        })
}

export const editHostel = (edit_data) => (dispatch) => {
    dispatch({type: DATA_LOADING})
    axios.post('/hostel/editHostel', {...edit_data})
        .then((res) => {
            dispatch({type: EDIT_HOSTEL, payload: res.data.data})
        })
        .catch((err) => {
            console.log(err)
        })
}

export const searchAPI = (search_term) => (dispatch) => {
    axios.get(`/hostel/searchAPI/${search_term}`)
    .then((res) => {

        dispatch({type: SET_SEARCH_DATA, payload: res.data.data.sort((x, y) => {return parseInt(y.hostel_rating, 10) - parseInt(x.hostel_rating, 10)})})
    })
    .catch((err) => {
        console.log(err)
    })
}

export const ratingHostel = (rating_data) => (dispatch) => {
    dispatch({type: DATA_LOADING})
    axios.post('/hostel/rating', {...rating_data})
        .then((res) => {
            let data = {
                booking_id: res.data.data,
                rating : res.data.rating
            }
            dispatch({type: RATING, payload: data})
        })
        .catch((err) => {
            console.log(err)
        })
}

// Admin
export const getAllHostelList = () => (dispatch) => {
    axios.get('/hostel/getAllHostelList')
        .then((res) => {
            dispatch({type: SET_ALL_HOSTEL_LIST, payload: res.data.data})
        })
        .catch((err) => {
            console.log(err)
        })
}

export const adminApproveHostelRequest = (approve_data) => (dispatch) => {
    dispatch({type: DATA_LOADING})
    axios.post('/hostel/adminApproveHostelRequest', {...approve_data})
        .then((res) => {
            dispatch({type: APPROVE_REQUEST, payload: {...approve_data}})
        })
        .catch((err) => {
            console.log(err)
        })
}