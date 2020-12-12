import { ADD_AUTH_ERROR, CLEAR_AUTH_ERROR } from "../types/error";
import { errorTypes, errorState } from "../types/error";

const initState: errorState = {
	auth: null,
};

const error = (state = initState, action: errorTypes) => {
	switch (action.type) {
		case ADD_AUTH_ERROR:
			return { ...state, auth: action.payload };
		case CLEAR_AUTH_ERROR:
			return { ...state, auth: initState.auth };
		default:
			return state;
	}
};

export default error;
