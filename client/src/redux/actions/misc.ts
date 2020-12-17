import { SET_USER_LIST } from "../types/misc";
import { miscTypes } from "../types/misc";

export const setUserList = (data: miscTypes) => {
	return {
		type: SET_USER_LIST,
		payload: data,
	};
};
