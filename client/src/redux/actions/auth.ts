import axios from "axios";
import { PATH } from "../../constants/path";
import { SET_USER } from "../types/auth";
import { addAuthError } from "./error";

export const loginWithoutPassword = (username: string) => {};

export const loginWithPassword = (username: string, password: string) => {};

export const registerUser = (username: string, password: string) => {
	return async (dispatch: any) => {
		axios
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
			});
	};
};
