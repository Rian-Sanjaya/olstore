import {combineReducers} from 'redux'
import user from './user_reducer'

const allReducer = combineReducers({
  user
})

export default allReducer