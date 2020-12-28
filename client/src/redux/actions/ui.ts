import {
	TOGGLE_SIDEBAR,
	ADD_ERROR,
	CLEAR_ERROR,
	CLEAR_UI,
	TOGGLE_EMOJI_PICKER,
	TOGGLE_IMAGE_UPLOAD,
	SET_IMAGE_PREVIEW,
	TOGGLE_GIPHY_PICKER,
} from "../types/ui";

export const toggleSidebar = () => {
	return {
		type: TOGGLE_SIDEBAR,
	};
};

export const addError = (error: string, time: number = 3000) => {
	return async (dispatch: any) => {
		dispatch({
			type: ADD_ERROR,
			payload: error,
		});

		setTimeout(() => dispatch(clearError()), time);
	};
};

export const clearError = () => {
	return {
		type: CLEAR_ERROR,
	};
};

export const clearUI = () => {
	return {
		type: CLEAR_UI,
	};
};

export const toggleEmojiPicker = () => {
	return {
		type: TOGGLE_EMOJI_PICKER,
	};
};

export const toggleImageUpload = () => {
	return {
		type: TOGGLE_IMAGE_UPLOAD,
	};
};

export const setImagePreview = (image: string | null) => {
	return {
		type: SET_IMAGE_PREVIEW,
		payload: image,
	};
};

export const toggleGiphyPicker = () => {
	return {
		type: TOGGLE_GIPHY_PICKER,
	};
};
