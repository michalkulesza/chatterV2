import { ADD_MESSGAE, CLEAR_ROOM, SET_ROOM_DATA, LOCK_ROOM, SET_MESSAGE_DELETED, ADD_REACTION } from "../types/room";
import { roomTypes, roomState } from "../types/room";

const initState: roomState = {
	_id: undefined,
	users: [],
	messages: [
		{
			_id: "1",
			author: { name: "admin", picture: "" },
			content: "Connected",
			created: new Date().toISOString(),
			reactions: {
				"+1": 0,
				heart: 0,
				rolling_on_the_floor_laughing: 0,
				slightly_frowning_face: 0,
			},
		},
	],
	type: undefined,
	locked: false,
};

const room = (state = initState, action: roomTypes) => {
	let messagesCopy;

	switch (action.type) {
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
			messagesCopy = [...state.messages];
			const index = messagesCopy.findIndex(message => message._id === action.payload);
			messagesCopy[index].deleted = true;

			return {
				...state,
				messages: messagesCopy,
			};
		case CLEAR_ROOM:
			return initState;
		case ADD_REACTION:
			messagesCopy = [...state.messages];
			const messageIndex = messagesCopy.findIndex(msg => msg._id === action.payload.messageID);
			if (messageIndex > -1) {
				let reaction: "+1" | "heart" | "rolling_on_the_floor_laughing" | "slightly_frowning_face" =
					action.payload.reaction;
				messagesCopy[messageIndex].reactions[reaction] += 1;
				return { ...state, messages: messagesCopy };
			} else {
				return state;
			}
		default:
			return state;
	}
};

export default room;
