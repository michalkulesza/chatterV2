import { ADD_MESSGAE, CLEAR_ROOM, SET_JOINING, SET_ROOM_DATA, LOCK_ROOM, SET_MESSAGE_DELETED } from "../types/room";
import { roomTypes, roomState } from "../types/room";

const initState: roomState = {
	joining: false,
	_id: undefined,
	users: [],
	messages: [{ _id: "1", author: "admin", content: "Connected", created: new Date().toISOString() }],
	type: undefined,
	locked: false,
};

const room = (state = initState, action: roomTypes) => {
	switch (action.type) {
		case SET_JOINING:
			return { ...state, joining: action.payload };
		case SET_ROOM_DATA:
			return { ...state, ...action.payload };
		case ADD_MESSGAE:
			return { ...state, messages: [...state.messages, action.payload] };
		case LOCK_ROOM:
			return {
				...state,
				locked: state._id === action.payload ? true : false,
			};
		case SET_MESSAGE_DELETED:
			let messagesCopy = [...state.messages];
			const index = messagesCopy.findIndex(message => message._id === action.payload);
			messagesCopy[index].deleted = true;

			return {
				...state,
				messages: messagesCopy,
			};
		case CLEAR_ROOM:
			return initState;
		default:
			return state;
	}
};

export default room;
