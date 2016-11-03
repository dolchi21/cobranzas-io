'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = reducer;
exports.addSocket = addSocket;
var ADD_SOCKET = 'SOCKETS/ADD_SOCKET';

exports.ADD_SOCKET = ADD_SOCKET;

function reducer(state, action) {
	if (state === undefined) state = {};
	var type = action.type;
	var payload = action.payload;

	switch (type) {

		case ADD_SOCKET:
			return Object.assign({}, state, payload);

		default:
			return state;

	}
}

function addSocket(id) {
	return {
		type: ADD_SOCKET,
		payload: {
			id: id
		}
	};
}