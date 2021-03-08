import {SET_AVAILABLE_HOSTEL, DATA_LOADING} from "../types";
  
const initialState = {
    available_hostels: [],
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

      default:
        return state;
    }
}