import { TOGGLE_SIDEBAR, SET_LOADING } from "../types/ui";
import { uiState, uiTypes } from "../types/ui";

const initState: uiState = {
	sidebarVisible: true,
	loading: false,
};

const error = (state = initState, action: uiTypes) => {
	switch (action.type) {
		case TOGGLE_SIDEBAR:
			return { ...state, sidebarVisible: !state.sidebarVisible };
		case SET_LOADING:
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};

export default error;
