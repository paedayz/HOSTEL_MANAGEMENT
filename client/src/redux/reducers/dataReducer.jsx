import {
    SET_AVAILABLE_HOSTEL,
    DATA_LOADING,
    SET_SINGLE_HOSTEL_DETAIL,
    BOOKING,
    CANCEL_BOOKING,
    SET_BOOKING_LIST ,
    SET_OWN_HOSTEL,
    DELETE_HOSTEL,
    SET_HOSTEL_STATUS,
    ADD_HOSTEL,
    EDIT_HOSTEL,
    SET_ALL_HOSTEL_LIST,
    APPROVE_REQUEST
} from "../types";
  
const initialState = {
    available_hostels: [],
    single_hostel_detail: {},
    booking_list: [],
    own_hostel: [],
    all_hostel_list : [],
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
    case SET_OWN_HOSTEL: 
        return {
            ...state,
            own_hostel: action.payload,
            loading: false
        }

    case DELETE_HOSTEL: 
        let current_own_hostel = state.own_hostel.filter((hostel) => {return hostel._id !== action.payload})
        let current_all_hostel = state.all_hostel_list.filter((hostel) => {return hostel._id !== action.payload})
        return {
            ...state,
            own_hostel: current_own_hostel,
            all_hostel_list: current_all_hostel,
            loading: false
        }

    case SET_HOSTEL_STATUS:
        let new_hostel_status = []
        state.own_hostel.map((hostel) => {
            if(hostel._id === action.payload._id) {
                hostel.status = action.payload.status
            }
            new_hostel_status.push(hostel)
        })
        return {
            ...state,
            own_hostel: new_hostel_status,
            loading: false
        }

    case ADD_HOSTEL :
        let new_add_hostel = state.own_hostel
        new_add_hostel.push(action.payload)
        return {
            ...state,
            own_hostel: new_add_hostel,
            loading: false
        }

    case EDIT_HOSTEL :
        let new_edit_hostel = []
        state.own_hostel.map((hostel) => {
            if(hostel._id === action.payload._id) {
                hostel = action.payload
            }
            new_edit_hostel.push(hostel)
        })
        return {
            ...state,
            own_hostel: new_edit_hostel,
            loading: false
        }

    case SET_ALL_HOSTEL_LIST :
        return {
            ...state,
            all_hostel_list: action.payload,
            loading: false
        }

    case APPROVE_REQUEST :
        let new_approve_hostel = []
        state.all_hostel_list.map((hostel) => {
            if(hostel._id === action.payload._id) {
                hostel.admin_approve = action.payload.admin_approve
            }
            new_approve_hostel.push(hostel)
        })
        return {
            ...state,
            all_hostel_list: new_approve_hostel,
            loading: false
        }

      default:
        return state;
    }
}