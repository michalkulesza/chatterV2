export const SET_USER_LIST = "SET_USER_LIST";
export const CLEAR_MISC = "CLEAR_MISC";

import { UserI } from "../../types/index";

export interface miscState {
	userList: UserI[] | [];
}

export interface setUserListAction {
	type: typeof SET_USER_LIST;
	payload: UserI[];
}

export interface clearMiscAction {
	type: typeof CLEAR_MISC;
}
export type miscTypes = setUserListAction | clearMiscAction;
