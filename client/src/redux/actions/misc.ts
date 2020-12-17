import { UserI } from "../../types";
import { SET_USER_LIST } from "../types/misc";
import { miscTypes, miscState } from "../types/misc";

export const setUserList = (users: UserI[]) => {
	return {
		type: SET_USER_LIST,
		payload: users,
	};
};
