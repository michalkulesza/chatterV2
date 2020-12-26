import { TOGGLE_SIDEBAR, SET_LOADING, ADD_ERROR, CLEAR_ERROR, CLEAR_UI, TOGGLE_EMOJI_PICKER } from "../types/ui";
import { uiState, uiTypes } from "../types/ui";

const initState: uiState = {
	sidebarVisible: true,
	loading: false,
	error: null,
	emojiPicker: false,
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
		case CLEAR_UI:
			return initState;
		case TOGGLE_EMOJI_PICKER:
			return { ...state, emojiPicker: !state.emojiPicker };
		default:
			return state;
	}
};

export default error;
