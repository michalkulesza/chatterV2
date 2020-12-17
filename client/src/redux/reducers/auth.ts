import { authState, SET_LOADING, SET_USER, SET_USER_ROOMS } from "../types/auth";
import { authTypes } from "../types/auth";

const initState: authState = {
	username: null,
	registered: null,
	loading: false,
	userRooms: ["Main"],
};

const auth = (state = initState, action: authTypes) => {
	switch (action.type) {
		case SET_USER:
			return { ...state, ...action.payload };
		case SET_LOADING:
			return { ...state, loading: action.payload };
		case SET_USER_ROOMS:
			return { ...state, userRooms: action.payload };
		default:
			return state;
	}
};

export default auth;
