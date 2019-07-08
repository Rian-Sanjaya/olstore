import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reduxPromise from 'redux-promise'
import reducers from './reducers'

// const middleware = applyMiddleware(reduxPromise, thunk)
const middleware = [reduxPromise, thunk]

const store = createStore(
  reducers,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store