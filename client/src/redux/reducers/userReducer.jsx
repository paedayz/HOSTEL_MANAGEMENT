import {SET_USER_CREDENTIALS} from "../types";
  
const initialState = {
    authenticated: false,
    credentials: {},
    loading: false,
    error: null
};
// eslint-disable-next-line 
export default function (state = initialState, action) {
    switch (action.type) {
      case SET_USER_CREDENTIALS :
          return{
              ...state
          }
      default:
        return state;
    }
}