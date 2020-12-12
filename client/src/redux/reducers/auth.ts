import { authState, SET_USER } from "../types/auth";
import { authTypes } from "../types/auth";

const initState: authState = {
	username: null,
	registered: null,
};

const auth = (state = initState, action: authTypes) => {
	switch (action.type) {
		case SET_USER:
			return action.payload;
		default:
			return state;
	}
};

export default auth;
