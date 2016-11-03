export const ADD_USER = 'USERS/ADD_USER';

export default function reducer(state = {}, action){

	var { type, payload } = action

	switch (type) {

		case ADD_USER:
		return Object.assign({}, state, payload)
		
		default:
		return state;

	}

}

export function addUser(user){
	return {
		type : ADD_USER,
		payload : {
			username : user.username
		}
	}
}
