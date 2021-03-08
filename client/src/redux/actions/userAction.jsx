import axios from 'axios'
import {CLEAR_ERRORS, SET_ERRORS} from '../types'

export const login = (user_data) => (dispatch) => {
    console.log(user_data)
    axios.post('/auth/login', {...user_data})
      .then((res) => {
        setAuthorizationHeader(res.data.token);
        dispatch({ type: CLEAR_ERRORS });
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err.response)
        dispatch({ type: SET_ERRORS, payload: err.response.data.message });
      });
  };

  const setAuthorizationHeader = (token) => {
    const UserIdToken = `Bearer ${token}`;
    localStorage.setItem("UserIdToken", UserIdToken);
    axios.defaults.headers.common["Authorization"] = UserIdToken;
  };