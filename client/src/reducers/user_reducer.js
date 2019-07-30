import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART_USER,
  GET_CART_ITEMS_USER,
  REMOVE_CART_ITEM_USER,
  UPDATE_DATA_USER,
  CLEAR_UPDATE_USER_DATA
} from '../actions/types'

const initialState = {
  authUser: {
    loading: true
  }
}

const user = (state=initialState, action) => {
  switch(action.type) {
    case AUTH_USER:
      return {
        ...state,
        authUser: {
          ...state.authUser,
          loading: false,
          ...action.payload
        }
      }

    case LOGIN_USER:
      return {
        ...state,
        login: action.payload
      }

    case REGISTER_USER:
      return {
        ...state,
        register: action.payload
      }

    case LOGOUT_USER:
      return {
        ...state,
        logout: action.payload 
      }

    case ADD_TO_CART_USER:
      return {
        ...state,
        authUser: {
          ...state.authUser,
          cart: action.payload
        }
      }

    case GET_CART_ITEMS_USER:
      return { 
        ...state, 
        cartDetail: action.payload 
      }

    case REMOVE_CART_ITEM_USER:
      return {
        ...state,
        cartDetail: action.payload.cartDetail,
        authUser: {
          ...state.authUser,
          cart: action.payload.cart
        }
      }

    case UPDATE_DATA_USER:
      return {
        ...state,
        updateUser: action.payload
      }

    case CLEAR_UPDATE_USER_DATA:
      return {
        ...state, 
        updateUser: action.payload
      }

    default:
      return state
  }
}

export default user