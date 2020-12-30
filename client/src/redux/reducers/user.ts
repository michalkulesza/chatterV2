import {
	ADD_USER_ROOM,
	CLEAR_USER,
	LOCK_ROOM,
	REMOVE_USER_ROOM,
	SET_USER,
	SET_USER_ROOMS,
	SET_AVATAR_SELECTED,
	SET_PROFILE_IMAGE,
	SET_UPLOADED_IMAGE,
	SET_UPLOADING,
	UPDATE_PROFILE_IMAGE,
	SET_USER_REACTIONS,
	ADD_UNREAD_MESSAGE,
	CLEAR_UNREAD_MESSAGES,
} from "../types/user";
import { userState, userTypes } from "../types/user";
import { Default1 } from "../../constants/defaultProfilePictures";

const initState: userState = {
	username: undefined,
	registered: false,
	avatarSelected: false,
	userRooms: [
		{
			_id: "Main",
			type: "room",
			locked: false,
		},
	],
	profileImage: Default1,
	uploadedImage: null,
	uploading: false,
	reactions: [],
	unreadMessages: [],
};

const user = (state = initState, action: userTypes) => {
	let roomIndex;

	switch (action.type) {
		case SET_USER:
			return { ...state, ...action.payload };
		case SET_USER_ROOMS:
			return { ...state, userRooms: action.payload };
		case SET_USER_REACTIONS:
			return { ...state, reactions: action.payload };
		case ADD_USER_ROOM:
			return { ...state, userRooms: [...state.userRooms, action.payload] };
		case REMOVE_USER_ROOM:
			return {
				...state,
				userRooms: state.userRooms.splice(
					state.userRooms.findIndex(room => room._id === action.payload),
					1
				),
			};
		case LOCK_ROOM:
			const userRoomsCopy = [...state.userRooms];
			userRoomsCopy.forEach(room => {
				if (room._id === action.payload) room.locked = true;
			});

			return {
				...state,
				userRooms: userRoomsCopy,
			};
		case SET_AVATAR_SELECTED:
			return { ...state, avatarSelected: action.payload };
		case SET_PROFILE_IMAGE:
			return { ...state, profileImage: action.payload };
		case SET_UPLOADED_IMAGE:
			return { ...state, uploadedImage: action.payload };
		case UPDATE_PROFILE_IMAGE:
			return { ...state, profileImage: action.payload };
		case SET_UPLOADING:
			return { ...state, uploading: action.payload };
		case CLEAR_USER:
			return initState;
		case ADD_UNREAD_MESSAGE:
			roomIndex = state.unreadMessages.findIndex(unreadMsg => unreadMsg.room === action.payload.room);
			let unreadMessagesCopy = [...state.unreadMessages];

			if (roomIndex > -1) {
				unreadMessagesCopy[roomIndex].count += action.payload.count;

				return { ...state, unreadMessages: unreadMessagesCopy };
			} else {
				return { ...state, unreadMessages: [...state.unreadMessages, action.payload] };
			}
		case CLEAR_UNREAD_MESSAGES:
			roomIndex = state.unreadMessages.findIndex(unreadMsg => unreadMsg.room === action.payload);

			if (roomIndex > -1) {
				let unreadMessagesCopy = [...state.unreadMessages];
				unreadMessagesCopy.splice(roomIndex, 1);
				return { ...state, unreadMessages: unreadMessagesCopy };
			} else {
				return state;
			}

		default:
			return state;
	}
};

export default user;
