import { ADD_MESSGAE, CLEAR_ROOM, SET_JOINING, SET_ROOM_DATA } from "../types/room";
import { roomTypes, roomState } from "../types/room";

const initState: roomState = {
	joining: false,
	_id: undefined,
	directUsers: undefined,
	messages: [{ _id: "1", author: "admin", content: "Connected", created: new Date().toISOString() }],
	type: undefined,
};

const room = (state = initState, action: roomTypes) => {
	switch (action.type) {
		case SET_JOINING:
			return { ...state, joining: action.payload };
		case SET_ROOM_DATA:
			return { ...state, ...action.payload };
		case ADD_MESSGAE:
			return { ...state, messages: [...state.messages, action.payload] };
		case CLEAR_ROOM:
			return initState;
		default:
			return state;
	}
};

export default room;
