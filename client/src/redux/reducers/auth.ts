import {
	ADD_USER_ROOM,
	authState,
	CLEAR_USER,
	REMOVE_USER_ROOM,
	SET_LOADING,
	SET_USER,
	SET_USER_ROOMS,
} from "../types/auth";
import { authTypes } from "../types/auth";

const initState: authState = {
	username: null,
	registered: false,
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
		case ADD_USER_ROOM:
			return { ...state, userRooms: [...state.userRooms, action.payload] };
		case REMOVE_USER_ROOM:
			return {
				...state,
				userRooms: state.userRooms.splice(
					state.userRooms.findIndex(room => room === action.payload),
					1
				),
			};
		case CLEAR_USER:
			return initState;
		default:
			return state;
	}
};

export default auth;
