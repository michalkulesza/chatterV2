import axios from "axios";
import { PATH } from "../../constants/path";
import {
	ADD_USER_ROOM,
	CLEAR_USER,
	LOCK_ROOM,
	REMOVE_USER_ROOM,
	SET_AVATAR_SELECTED,
	SET_PROFILE_IMAGE,
	SET_UPLOADED_IMAGE,
	SET_UPLOADING,
	SET_USER,
	SET_USER_REACTIONS,
	SET_USER_ROOMS,
	UPDATE_PROFILE_IMAGE,
	userRoomI,
} from "../types/user";
import { SET_LOADING } from "../types/ui";
import { addError } from "./ui";
import storage from "../../config/firebase";
import { ReactionsI } from "../../types";

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

					dispatch({
						type: SET_AVATAR_SELECTED,
						payload: true,
					});
				}
			})
			.catch(err => {
				dispatch(addError("Username is already taken."));
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
					const profileImage = res.data;

					dispatch({
						type: SET_USER,
						payload: { username, registered: true, profileImage },
					});

					dispatch({
						type: SET_AVATAR_SELECTED,
						payload: true,
					});
				}
			})
			.catch(err => {
				dispatch(addError("Please check email and/or password."));
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

export const registerUser = (username: string, password: string, profileImage: string) => {
	return async (dispatch: any) => {
		dispatch({
			type: SET_LOADING,
			payload: true,
		});

		return axios
			.post(`${PATH}/auth/register`, {
				username,
				password,
				profileImage,
			})
			.then(res => {
				if (res.status === 200) {
					dispatch({
						type: SET_USER,
						payload: { username, registered: true, profileImage },
					});
				}
			})
			.catch(err => {
				dispatch(addError("Username is already taken."));
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

export const setUserReactions = (reactions: ReactionsI) => {
	return {
		type: SET_USER_REACTIONS,
		payload: reactions,
	};
};

export const setUserRooms = (rooms: userRoomI[]) => {
	return {
		type: SET_USER_ROOMS,
		payload: rooms,
	};
};

export const addUserRoom = (room: userRoomI) => {
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

export const updateLockRoomOnList = (room: string) => {
	return {
		type: LOCK_ROOM,
		payload: room,
	};
};

export const setProfileImage = (image: string) => {
	return async (dispatch: any) => {
		dispatch({
			type: SET_PROFILE_IMAGE,
			payload: image,
		});
	};
};

export const uploadProfileImage = (image: File) => {
	return async (dispatch: any) => {
		const fileName = `image-${Date.now()}`;

		const uploadImage = storage.storage.ref(`images/${fileName}`).put(image);

		dispatch({
			type: SET_UPLOADING,
			payload: true,
		});

		uploadImage.on(
			"state_changed",
			() => {},
			error => {
				dispatch(addError(error.message));
			},
			() => {
				storage.storage
					.ref("images")
					.child(fileName)
					.getDownloadURL()
					.then(url => {
						dispatch(setUploadedImage(url));
					});

				dispatch({
					type: SET_UPLOADING,
					payload: false,
				});
			}
		);
	};
};

export const setUploadedImage = (image: string) => {
	return async (dispatch: any) => {
		dispatch({
			type: SET_UPLOADED_IMAGE,
			payload: image,
		});
	};
};

export const setAvatarSelected = (state: boolean) => {
	return {
		type: SET_AVATAR_SELECTED,
		payload: state,
	};
};

export const updateProfileImage = (image: string, username: string, password: string) => {
	return async (dispatch: any) => {
		return axios
			.post(`${PATH}/auth/updateProfileImage`, {
				username,
				password,
				image,
			})
			.then(res => {
				if (res.status === 200) {
					const resImage = res.data;

					dispatch({
						type: UPDATE_PROFILE_IMAGE,
						payload: resImage,
					});
				}
			})
			.catch(err => {
				dispatch(addError("Something went wrong..."));
				console.error(err.message);
			});
	};
};
