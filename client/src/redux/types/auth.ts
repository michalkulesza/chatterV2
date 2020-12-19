export const SET_USER = "SET_USER";
export const SET_LOADING = "SET_LOADING";
export const SET_USER_ROOMS = "SET_USER_ROOMS";
export const CLEAR_USER = "CLEAR_USER";
export const ADD_USER_ROOM = "ADD_USER_ROOM";
export const REMOVE_USER_ROOM = "REMOVE_USER_ROOM";

export interface authState {
	username: string | null;
	registered: boolean;
	loading: boolean;
	userRooms: string[];
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
	payload: string[];
}

export interface addUserRoomAction {
	type: typeof ADD_USER_ROOM;
	payload: string;
}

export interface removeUserRoomAction {
	type: typeof REMOVE_USER_ROOM;
	payload: string;
}

export interface clearUser {
	type: typeof CLEAR_USER;
}

export type authTypes = setUser | setLoading | setUserRooms | clearUser | addUserRoomAction | removeUserRoomAction;
