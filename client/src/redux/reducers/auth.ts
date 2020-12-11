import { LOGIN_WITH_PASSWORD, LOGIN_WITHOUT_PASSWORD, REGISTER_USER } from "../types/auth";
import { loginWithoutPasswordAction } from "../types/auth";

const initState = {
	username: null,
	registered: null,
};

const auth = (state = initState, action: loginWithoutPasswordAction) => {
	switch (action.type) {
		case LOGIN_WITHOUT_PASSWORD:
			return { ...initState, username: action.payload };
		default:
			return state;
	}
};

export default auth;
