import { authState, SET_LOADING, SET_USER } from "../types/auth";
import { authTypes } from "../types/auth";

const initState: authState = {
	username: null,
	registered: null,
	loading: false,
};

const auth = (state = initState, action: authTypes) => {
	switch (action.type) {
		case SET_USER:
			return { ...state, ...action.payload };
		case SET_LOADING:
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};

export default auth;
