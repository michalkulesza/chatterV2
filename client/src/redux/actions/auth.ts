import axios from "axios";
import { PATH } from "../../constants/path";
import {
	addUserRoomAction,
	ADD_USER_ROOM,
	CLEAR_USER,
	REMOVE_USER_ROOM,
	SET_LOADING,
	SET_USER,
	SET_USER_ROOMS,
} from "../types/auth";
import { addAuthError } from "./error";

export const loginWithoutPassword = (username: string) => {
	return async (dispatch: any) => {
		dispatch({
			type: SET_LOADING,
			payload: true,
		});

		return axios
			.post(`${PATH}/auth/join`, {
				username,
			})
			.then(res => {
				if (res.status === 200) {
					dispatch({
						type: SET_USER,
						payload: { username, registered: false },
					});
				}
			})
			.catch(err => {
				dispatch(addAuthError("Username is already taken."));
				console.error(err.message);
			})
			.finally(() => {
				dispatch({
					type: SET_LOADING,
					payload: false,
				});
			});
	};
};

export const loginWithPassword = (username: string, password: string) => {
	return async (dispatch: any) => {
		dispatch({
			type: SET_LOADING,
			payload: true,
		});

		return axios
			.post(`${PATH}/auth/login`, {
				username,
				password,
			})
			.then(res => {
				if (res.status === 200) {
					dispatch({
						type: SET_USER,
						payload: { username, registered: true },
					});
				}
			})
			.catch(err => {
				dispatch(addAuthError("Please check email and/or password."));
				console.error(err.message);
			})
			.finally(() => {
				dispatch({
					type: SET_LOADING,
					payload: false,
				});
			});
	};
};

export const registerUser = (username: string, password: string) => {
	return async (dispatch: any) => {
		dispatch({
			type: SET_LOADING,
			payload: true,
		});

		return axios
			.post(`${PATH}/auth/register`, {
				username,
				password,
			})
			.then(res => {
				if (res.status === 200) {
					dispatch({
						type: SET_USER,
						payload: { username, registered: true },
					});
				}
			})
			.catch(err => {
				dispatch(addAuthError("Username is already taken."));
				console.error(err.message);
			})
			.finally(() => {
				dispatch({
					type: SET_LOADING,
					payload: false,
				});
			});
	};
};

export const setUserRooms = (rooms: string[]) => {
	return {
		type: SET_USER_ROOMS,
		payload: rooms,
	};
};

export const addUserRoom = (room: string) => {
	return {
		type: ADD_USER_ROOM,
		payload: room,
	};
};

export const removeUserRoom = (room: string) => {
	return {
		type: REMOVE_USER_ROOM,
		payload: room,
	};
};

export const clearUser = () => {
	return {
		type: CLEAR_USER,
	};
};
