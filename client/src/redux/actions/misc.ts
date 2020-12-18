import { UserI } from "../../types";
import { CLEAR_MISC, SET_USER_LIST } from "../types/misc";
import { miscTypes } from "../types/misc";

export const setUserList = (users: UserI[]): miscTypes => {
	return {
		type: SET_USER_LIST,
		payload: users,
	};
};

export const clearMisc = (): miscTypes => {
	return {
		type: CLEAR_MISC,
	};
};
