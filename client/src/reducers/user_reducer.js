import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER
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

    default:
      return state
  }
}

export default user