import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reduxPromise from 'redux-promise'
import allReducer from './reducers'

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STATE') {
    state = undefined
  } 

  return allReducer(state, action)
}

// const middleware = applyMiddleware(reduxPromise, thunk)
const middleware = [reduxPromise, thunk]

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store