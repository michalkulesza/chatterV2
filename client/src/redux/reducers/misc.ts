import { CLEAR_MISC, SET_USER_LIST } from "../types/misc";
import { miscTypes, miscState } from "../types/misc";

const initState: miscState = {
	userList: [],
};

const misc = (state = initState, action: miscTypes) => {
	switch (action.type) {
		case SET_USER_LIST:
			return { ...state, userList: action.payload };
		case CLEAR_MISC:
			return initState;
		default:
			return state;
	}
};

export default misc;
