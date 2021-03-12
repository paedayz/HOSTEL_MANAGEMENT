import axios from 'axios'
import {CLEAR_ERRORS, SET_ERRORS, SET_UNAUTHENTICATED, EDIT_PROFILE, DATA_LOADING} from '../types'

export const login = (user_data) => (dispatch) => {
  dispatch({ type: DATA_LOADING });
  dispatch({ type: CLEAR_ERRORS });
  axios.post('/auth/login', {...user_data})
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch({ type: CLEAR_ERRORS });
      window.location.href = "/";
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data.message });
    });
};

export const register = (register_data) => (dispatch) => {
  dispatch({ type: DATA_LOADING });
  dispatch({ type: CLEAR_ERRORS });
  axios.post('/auth/register', {...register_data})
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch({ type: CLEAR_ERRORS });
      window.location.href = "/";
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data.message });
    });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("UserIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

const setAuthorizationHeader = (token) => {
  const UserIdToken = `Bearer ${token}`;
  localStorage.setItem("UserIdToken", UserIdToken);
  axios.defaults.headers.common["Authorization"] = UserIdToken;
};

export const editProfile = (edit_data) =>(dispatch) => {
  axios.post('/auth/editProfile', {...edit_data})
    .then((res) => {
      setAuthorizationHeader(res.data.token)
      dispatch({type: EDIT_PROFILE, payload: res.data.data})
      window.alert('Edit Profile Successfully')
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data.message });
    });
}