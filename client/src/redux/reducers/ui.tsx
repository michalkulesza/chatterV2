import { TOGGLE_SIDEBAR } from "../types/ui";
import { uiState, uiTypes } from "../types/ui";

const initState: uiState = {
	sidebarVisible: true,
};

const error = (state = initState, action: uiTypes) => {
	switch (action.type) {
		case TOGGLE_SIDEBAR:
			return { ...state, sidebarVisible: !state.sidebarVisible };
		default:
			return state;
	}
};

export default error;
