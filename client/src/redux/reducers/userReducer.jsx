import {SET_USER_CREDENTIALS, CLEAR_ERRORS, SET_ERRORS, SET_UNAUTHENTICATED} from "../types";
  
const initialState = {
    authenticated: false,
    credentials: {},
    loading: false,
    error: null
};

const startState = {
    authenticated: false,
    credentials: {},
    loading: false,
    error: null
};
// eslint-disable-next-line 
export default function (state = initialState, action) {
    switch (action.type) {

        case SET_USER_CREDENTIALS :
            return {
                ...state,
                credentials: action.payload,
                authenticated: true
            }
        
        case SET_UNAUTHENTICATED:
            return startState

        case CLEAR_ERRORS :
            return {
                ...state,
                error: null
            }
        
        case SET_ERRORS :
            return {
                ...state,
                error: action.payload
            }

      default:
        return state;
    }
}