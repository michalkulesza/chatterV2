import { LOGIN_WITH_PASSWORD, LOGIN_WITHOUT_PASSWORD, REGISTER_USER } from "../types/auth";
import { authTypes } from "../types/auth";

const initState = {
	username: null,
	registered: null,
};

const auth = (state = initState, action: authTypes) => {
	switch (action.type) {
		case LOGIN_WITHOUT_PASSWORD:
			return { ...state, username: action.payload };
		default:
			return state;
	}
};

export default auth;
