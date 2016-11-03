export const ADD_SOCKET = 'SOCKETS/ADD_SOCKET';

export default function reducer(state = {}, action){

	var { type, payload } = action

	switch (type) {

		case ADD_SOCKET:
		return Object.assign({}, state, payload)
		
		default:
		return state;

	}

}

export function addSocket(id){
	return {
		type : ADD_SOCKET,
		payload : {
			id
		}
	}
}
