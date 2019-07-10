import axios from 'axios'
import {USER_ROUTES, PRODUCT_ROUTES} from '../components/utils/misc'
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER
} from './types'

export function loginUser(dataToSubmit) {
  return (dispatch) => {
    axios.post(`${USER_ROUTES}/login`, dataToSubmit)
    .then(res => {return res.data})
    .then(res => {
      return dispatch({
        type: LOGIN_USER,
        payload: res
      })
    })
    .catch( err => console.error(err) )
  }
}

export function logoutUser() {
  return(dispatch) => {
    axios.get(`${USER_ROUTES}/logout`)
    .then( res => res.data )
    .then( res => {
      return dispatch({
        type: LOGOUT_USER,
        payload: res
      })
    })
    .catch( err => console.log(err) )
  }
}

export function registerUser(dataToSubmit) {
  return (dispatch) => {
    axios.post(`${USER_ROUTES}/register`, dataToSubmit)
    .then( res => res.data)
    .then( res => {
      return dispatch({
        type: REGISTER_USER,
        payload: res
      })
    })
    .catch( err => console.error(err) )
  }
}

export function auth() {
  return (dispatch) => {
    axios.get(`${USER_ROUTES}/auth`)
    .then( res => res.data )
    .then( res => {
      return dispatch({
        type: AUTH_USER,
        payload: res
      })
    })
    .catch( err => console.error(err) )
  }
}