export const SET_USER_LIST = "SET_USER_LIST";

import { UserI } from "../../types/index";

export interface miscState {
	userList: UserI[] | [];
}

export interface setUserListAction {
	type: typeof SET_USER_LIST;
	payload: UserI[];
}

export type miscTypes = setUserListAction;
