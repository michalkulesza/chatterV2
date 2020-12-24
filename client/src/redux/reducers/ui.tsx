import { TOGGLE_SIDEBAR, SET_LOADING, ADD_ERROR, CLEAR_ERROR } from "../types/ui";
import { uiState, uiTypes } from "../types/ui";

const initState: uiState = {
	sidebarVisible: true,
	loading: false,
	error: null,
};

const error = (state = initState, action: uiTypes) => {
	switch (action.type) {
		case TOGGLE_SIDEBAR:
			return { ...state, sidebarVisible: !state.sidebarVisible };
		case SET_LOADING:
			return { ...state, loading: action.payload };
		case ADD_ERROR:
			return { ...state, error: action.payload };
		case CLEAR_ERROR:
			return { ...state, error: initState.error };
		default:
			return state;
	}
};

export default error;
