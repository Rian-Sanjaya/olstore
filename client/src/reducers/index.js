import {combineReducers} from 'redux'
import user from './user_reducer'
import product from './product_reducer'

const allReducer = combineReducers({
  user,
  product
})

export default allReducer