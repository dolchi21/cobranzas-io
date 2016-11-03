import { combineReducers } from 'redux'

import users from './modules/Users.js'

var reducer = combineReducers({
	users,
})

export default reducer
