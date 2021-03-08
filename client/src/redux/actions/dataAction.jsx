import axios from 'axios'
import {DATA_LOADING, SET_AVAILABLE_HOSTEL, SET_SINGLE_HOSTEL_DETAIL, BOOKING} from '../types'

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
            dispatch({type: SET_SINGLE_HOSTEL_DETAIL, payload: res.data.data})
        })
        .catch((err) => {
            console.log(err)
        })
}

export const booking = (hostelId) => (dispatch) => {
    dispatch({type: DATA_LOADING})
    axios.post('/hostel/booking',{hostel_id : hostelId})
        .then((res) => {
            dispatch({type: BOOKING})
        })
        .catch((err) => {
            console.log(err)
        })
}