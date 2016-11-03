import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducer from './reducer.js'

var middleware = applyMiddleware(thunk)

var store = createStore(reducer, middleware)

export default store;
