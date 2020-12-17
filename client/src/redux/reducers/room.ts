import { SET_JOINING, SET_ROOM_DATA } from "../types/room";
import { roomTypes, roomState } from "../types/room";

const initState: roomState = {
	joining: false,
	_id: undefined,
	directUsers: undefined,
	messages: undefined,
	type: undefined,
};

const room = (state = initState, action: roomTypes) => {
	switch (action.type) {
		case SET_JOINING:
			return { ...state, joining: action.payload };
		case SET_ROOM_DATA:
			return { ...state, ...action.payload };

		default:
			return state;
	}
};

export default room;
