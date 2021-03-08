import {SET_AVAILABLE_HOSTEL, DATA_LOADING, SET_SINGLE_HOSTEL_DETAIL} from "../types";
  
const initialState = {
    available_hostels: [],
    single_hostel_detail: {},
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

      default:
        return state;
    }
}