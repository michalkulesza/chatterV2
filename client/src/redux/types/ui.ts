export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";
export const SET_LOADING = "SET_LOADING";
export const ADD_ERROR = "ADD_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const TOGGLE_EMOJI_PICKER = "TOGGLE_EMOJI_PICKER";
export const TOGGLE_IMAGE_UPLOAD = "TOGGLE_IMAGE_UPLOAD";
export const CLEAR_UI = "CLEAR_UI";
export const SET_IMAGE_PREVIEW = "SET_IMAGE_PREVIEW";

export interface uiState {
	sidebarVisible: boolean;
	loading: boolean;
	error: null | string;
	emojiPicker: boolean;
	imageUpload: boolean;
	imagePreview: string | null;
}

export interface toggleSidebarAction {
	type: typeof TOGGLE_SIDEBAR;
}

export interface setLoadingAction {
	type: typeof SET_LOADING;
	payload: boolean;
}

export interface addErrorAction {
	type: typeof ADD_ERROR;
	payload: string;
}

export interface clearErrorAction {
	type: typeof CLEAR_ERROR;
}

export interface clearUiActon {
	type: typeof CLEAR_UI;
}

export interface toggleEmojiPicker {
	type: typeof TOGGLE_EMOJI_PICKER;
}

export interface toggleImageUpload {
	type: typeof TOGGLE_IMAGE_UPLOAD;
}

export interface setImagePreview {
	type: typeof SET_IMAGE_PREVIEW;
	payload: string | null;
}

export type uiTypes =
	| toggleSidebarAction
	| setLoadingAction
	| addErrorAction
	| clearErrorAction
	| clearUiActon
	| toggleEmojiPicker
	| toggleImageUpload
	| setImagePreview;
