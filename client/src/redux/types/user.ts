export const SET_USER = "SET_USER";
export const SET_USER_ROOMS = "SET_USER_ROOMS";
export const CLEAR_USER = "CLEAR_USER";
export const ADD_USER_ROOM = "ADD_USER_ROOM";
export const REMOVE_USER_ROOM = "REMOVE_USER_ROOM";
export const LOCK_ROOM = "LOCK_ROOM";
export const SET_AVATAR_SELECTED = "SET_AVATAR_SELECTED";
export const SET_PROFILE_IMAGE = "SET_PROFILE_IMAGE";
export const UPDATE_PROFILE_IMAGE = "UPDATE_PROFILE_IMAGE";
export const SET_UPLOADED_IMAGE = "SET_UPLOADED_IMAGE";
export const UPLOAD_PROFILE_IMAGE = "UPLOAD_PROFILE_IMAGE";
export const SET_LOADING = "SET_LOADING";
export const SET_UPLOADING = "SET_UPLOADING";

export interface userState {
	username: string | undefined;
	registered: boolean;
	loading: boolean;
	avatarSelected: boolean;
	userRooms: userRoomI[] | [];
	profileImage: string;
	uploadedImage: string | null;
	uploading: boolean;
}

export interface userRoomI {
	_id: string;
	type: "room" | "private";
	users?: string[];
	locked?: boolean;
}

export interface setUserAction {
	type: typeof SET_USER;
	payload: {
		username: string;
		registered: boolean;
		profileImage: string;
	};
}

export interface setLoadingAction {
	type: typeof SET_LOADING;
	payload: boolean;
}

export interface setUserRoomsAction {
	type: typeof SET_USER_ROOMS;
	payload: userRoomI[] | [];
}

export interface addUserRoomAction {
	type: typeof ADD_USER_ROOM;
	payload: userRoomI;
}

export interface removeUserRoomAction {
	type: typeof REMOVE_USER_ROOM;
	payload: string;
}

export interface clearUserAction {
	type: typeof CLEAR_USER;
}

export interface lockRoomAction {
	type: typeof LOCK_ROOM;
	payload: string;
}

export interface setAvatarSelectedAction {
	type: typeof SET_AVATAR_SELECTED;
	payload: boolean;
}

export interface setProfileImageAction {
	type: typeof SET_PROFILE_IMAGE;
	payload: string;
}

export interface uploadProfileImageAction {
	type: typeof UPLOAD_PROFILE_IMAGE;
	payload: File;
}

export interface setUploadedImageAction {
	type: typeof SET_UPLOADED_IMAGE;
	payload: string;
}

export interface setUploadingAction {
	type: typeof SET_UPLOADING;
	payload: boolean;
}

export interface updateProfileImageAction {
	type: typeof UPDATE_PROFILE_IMAGE;
	payload: string;
}

export type userTypes =
	| setUserAction
	| setLoadingAction
	| setUserRoomsAction
	| clearUserAction
	| addUserRoomAction
	| removeUserRoomAction
	| lockRoomAction
	| setAvatarSelectedAction
	| setProfileImageAction
	| uploadProfileImageAction
	| setUploadedImageAction
	| setUploadingAction
	| updateProfileImageAction
	| userRoomI;
