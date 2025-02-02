import axios from "axios"
import { AUTH_FAILURE, AUTH_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS } from "./actionTypes"


export const signup = (details) => (dispatch) => {
    dispatch({type : AUTH_REQUEST})
   axios.post('http://localhost:3005/users/register', details)
   .then(res => {
      dispatch({type : REGISTER_SUCCESS, payload : res.data.msg})
   })
   .catch(error => {
     dispatch({type : AUTH_FAILURE, payload : error.response.data.msg})
   })
}

export const login = (userData) => (dispatch) => {
    dispatch({type : AUTH_REQUEST})
   axios.post('http://localhost:3005/users/login', userData)
   .then(res => {
    localStorage.setItem("ch-token", JSON.stringify({...res.data}));

    dispatch({type : LOGIN_SUCCESS, payload : res.data})
  })
  .catch(error => {
     console.log(error);
     dispatch({type : AUTH_FAILURE, payload : error.response.data.msg})
   })
}

export const logout = (token) => (dispatch) => {
   dispatch({type : AUTH_REQUEST})
  axios.get('http://localhost:3005/users/logout', {
    headers : {
      'Authorization' : `Bearer ${token}`
    }
  })
  .then(res => {
     dispatch({type : LOGOUT_SUCCESS})
  })
  .catch(error => {
    dispatch({type : AUTH_FAILURE});
  })
}
