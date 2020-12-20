export const SET_USER = "SET_USER";
export const SET_LOADING = "SET_LOADING";
export const SET_USER_ROOMS = "SET_USER_ROOMS";
export const CLEAR_USER = "CLEAR_USER";
export const ADD_USER_ROOM = "ADD_USER_ROOM";
export const REMOVE_USER_ROOM = "REMOVE_USER_ROOM";
export const LOCK_ROOM = "LOCK_ROOM";

export interface authState {
	username: string | undefined;
	registered: boolean;
	loading: boolean;
	userRooms: userRoomI[] | [];
}

export interface userRoomI {
	_id: string;
	type: "room" | "private";
	users?: string[];
	locked?: boolean;
}

export interface setUser {
	type: typeof SET_USER;
	payload: {
		username: string;
		registered: boolean;
	};
}

export interface setLoading {
	type: typeof SET_LOADING;
	payload: boolean;
}

export interface setUserRooms {
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

export interface clearUser {
	type: typeof CLEAR_USER;
}

export interface lockRoomAction {
	type: typeof LOCK_ROOM;
	payload: string;
}

export type authTypes =
	| setUser
	| setLoading
	| setUserRooms
	| clearUser
	| addUserRoomAction
	| removeUserRoomAction
	| lockRoomAction
	| userRoomI;
