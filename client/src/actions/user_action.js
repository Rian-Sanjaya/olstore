import axios from 'axios'
import {USER_ROUTES, PRODUCT_ROUTES} from '../components/utils/misc'
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART_USER,
  GET_CART_ITEMS_USER,
  REMOVE_CART_ITEM_USER
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
    .then( res => dispatch({ type: 'RESET_STATE' }))
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

export function addToCart(_id) {
  return (dispatch) => {
    axios.post(`${USER_ROUTES}/addToCart?productId=${_id}`)
    .then( res => res.data )
    .then( res => {
      return dispatch({
        type: ADD_TO_CART_USER,
        payload: res
      })
    })
    .catch( err => console.error(err) )
  }
}

export function getCartItems(cartItems, userCart) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.get(`${PRODUCT_ROUTES}/articles_by_id?id=${cartItems}&type=array`)
      .then( res => {
        userCart.forEach( item => {
          res.data.forEach( (k, i) => {
            if (item.id === k._id) {
              res.data[i].quantity = item.quantity
            }
          })
        })
        // console.log({cart: userCart, data: res.data})
        return res.data
      })
      .then( res => {
        dispatch({
          type: GET_CART_ITEMS_USER, 
          payload: res
        })

        resolve()
      })
      .catch( err => {
        console.log(err)
        reject(err) 
      })
    })
  }
}

export function removeCartItem(id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.get(`${USER_ROUTES}/removeFromCart?_id=${id}`)
      .then( res => {
        res.data.cart.forEach( item => {
          res.data.cartDetail.forEach((k, i) => {
            if (item.id === k._id) {
              res.data.cartDetail[i].quantity = item.quantity
            }
          })
        })

        return res.data
      })
      .then( res => {
        dispatch({
          type: REMOVE_CART_ITEM_USER,
          payload: res
        })
        
        resolve()
      })
      .catch( err => {
        console.error(err)
        reject(err)
      })
    })
  }
}