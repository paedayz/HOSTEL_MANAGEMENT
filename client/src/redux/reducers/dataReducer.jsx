import {SET_AVAILABLE_HOSTEL, DATA_LOADING, SET_SINGLE_HOSTEL_DETAIL, BOOKING, CANCEL_BOOKING, SET_BOOKING_LIST} from "../types";
  
const initialState = {
    available_hostels: [],
    single_hostel_detail: {},
    booking_list: [],
    loading: false,
};

// eslint-disable-next-line 
export default function (state = initialState, action) {
    switch (action.type) {

        case DATA_LOADING :
            return {
                ...state,
                loading: true
            }

        case SET_AVAILABLE_HOSTEL :
            return {
                ...state,
                available_hostels: action.payload,
                loading: false
            }
        case SET_SINGLE_HOSTEL_DETAIL: 
            return {
                ...state,
                single_hostel_detail: action.payload,
                loading: false
            }
        case BOOKING :
            let new_current_hostel = state.single_hostel_detail
            new_current_hostel.is_booking = true
            new_current_hostel.booking_id = action.payload
            return {
                ...state,
                single_hostel_detail: new_current_hostel,
                loading: false
            }
        case CANCEL_BOOKING :
            let current_hostel = state.single_hostel_detail
            current_hostel.is_booking = false
            return {
                ...state,
                single_hostel_detail: current_hostel,
                loading: false
            }
        case SET_BOOKING_LIST: 
            return {
                ...state,
                booking_list: action.payload,
                loading: false
            }

      default:
        return state;
    }
}