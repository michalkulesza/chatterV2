import {
	ADD_MESSGAE,
	CLEAR_ROOM,
	SET_ROOM_DATA,
	LOCK_ROOM,
	SET_MESSAGE_DELETED,
	ADD_REACTION,
	REMOVE_REACTION,
	SET_CURRENT_PAGE,
	SET_PAGES_LEFT,
	ADD_MESSAGES_AT_BEGINNING,
} from "../types/room";
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
			image: null,
			giphyID: null,
		},
	],
	type: undefined,
	locked: false,
	currentPage: 0,
	pagesLeft: 0,
};

const room = (state = initState, action: roomTypes) => {
	let messagesCopy;
	let messageIndex;

	switch (action.type) {
		case SET_ROOM_DATA:
			return { ...state, ...action.payload };
		case ADD_MESSGAE:
			return { ...state, messages: [...state.messages, action.payload] };
		case ADD_MESSAGES_AT_BEGINNING:
			return { ...state, messages: [...action.payload, ...state.messages] };
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
			messageIndex = messagesCopy.findIndex(msg => msg._id === action.payload.messageID);
			if (messageIndex > -1) {
				let reaction: "+1" | "heart" | "rolling_on_the_floor_laughing" | "slightly_frowning_face" =
					action.payload.reaction;
				messagesCopy[messageIndex].reactions[reaction] += 1;
				return { ...state, messages: messagesCopy };
			} else {
				return state;
			}
		case REMOVE_REACTION:
			messagesCopy = [...state.messages];
			messageIndex = messagesCopy.findIndex(msg => msg._id === action.payload.messageID);
			if (messageIndex > -1) {
				let reaction: "+1" | "heart" | "rolling_on_the_floor_laughing" | "slightly_frowning_face" =
					action.payload.reaction;
				if (messagesCopy[messageIndex].reactions[reaction] > 0) messagesCopy[messageIndex].reactions[reaction] -= 1;
				return { ...state, messages: messagesCopy };
			} else {
				return state;
			}
		case SET_CURRENT_PAGE:
			return { ...state, currentPage: action.payload };
		case SET_PAGES_LEFT:
			return { ...state, pagesLeft: action.payload };
		default:
			return state;
	}
};

export default room;
