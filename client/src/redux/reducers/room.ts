import { SET_JOINING } from "../types/room";
import { roomTypes, roomState } from "../types/room";

const initState: roomState = {
	joining: false,
};

const error = (state = initState, action: roomTypes) => {
	switch (action.type) {
		case SET_JOINING:
			return { ...state, joining: action.payload };
		default:
			return state;
	}
};

export default error;
