import {
	ADD_USER_ROOM,
	authState,
	CLEAR_USER,
	LOCK_ROOM,
	REMOVE_USER_ROOM,
	SET_LOADING,
	SET_USER,
	SET_USER_ROOMS,
	SET_AVATAR_SELECTED,
	SET_PROFILE_IMAGE,
} from "../types/auth";
import { authTypes } from "../types/auth";
import { Default1 } from "../../constants/defaultProfilePictures";

const initState: authState = {
	username: undefined,
	registered: false,
	loading: false,
	avatarSelected: false,
	userRooms: [
		{
			_id: "Main",
			type: "room",
			locked: false,
		},
	],
	profileImage: Default1,
};

const auth = (state = initState, action: authTypes) => {
	switch (action.type) {
		case SET_USER:
			return { ...state, ...action.payload };
		case SET_LOADING:
			return { ...state, loading: action.payload };
		case SET_USER_ROOMS:
			return { ...state, userRooms: action.payload };
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
		case CLEAR_USER:
			return initState;
		default:
			return state;
	}
};

export default auth;
