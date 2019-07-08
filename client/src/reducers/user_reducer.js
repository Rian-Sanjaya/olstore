import {
  LOGIN_USER,
  REGISTER_USER
} from '../actions/types'

const user = (state={}, action) => {
  switch(action.type) {
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

    default:
      return state
  }
}

export default user