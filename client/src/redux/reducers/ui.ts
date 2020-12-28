import {
	TOGGLE_SIDEBAR,
	SET_LOADING,
	ADD_ERROR,
	CLEAR_ERROR,
	CLEAR_UI,
	TOGGLE_EMOJI_PICKER,
	TOGGLE_IMAGE_UPLOAD,
	SET_IMAGE_PREVIEW,
	TOGGLE_GIPHY_PICKER,
} from "../types/ui";
import { uiState, uiTypes } from "../types/ui";

const initState: uiState = {
	sidebarVisible: true,
	loading: false,
	error: null,
	emojiPicker: false,
	imageUpload: false,
	imagePreview: null,
	giphyPicker: false,
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
		case TOGGLE_IMAGE_UPLOAD:
			return { ...state, imageUpload: !state.imageUpload };
		case SET_IMAGE_PREVIEW:
			return { ...state, imagePreview: action.payload };
		case TOGGLE_GIPHY_PICKER:
			return { ...state, giphyPicker: !state.giphyPicker };
		default:
			return state;
	}
};

export default error;
