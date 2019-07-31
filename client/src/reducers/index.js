import {combineReducers} from 'redux'
import user from './user_reducer'
import product from './product_reducer'
import site from './site_reducer'

const allReducer = combineReducers({
  user,
  product,
  site
})

export default allReducer