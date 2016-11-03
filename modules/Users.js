'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = reducer;
exports.addUser = addUser;
var ADD_USER = 'USERS/ADD_USER';

exports.ADD_USER = ADD_USER;

function reducer(state, action) {
	if (state === undefined) state = {};
	var type = action.type;
	var payload = action.payload;

	switch (type) {

		case ADD_USER:
			return Object.assign({}, state, payload);

		default:
			return state;

	}
}

function addUser(user) {
	return {
		type: ADD_USER,
		payload: {
			username: user.username
		}
	};
}