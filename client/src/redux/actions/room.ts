import { JOIN_ROOM, SET_JOINING, SET_ROOM_DATA } from "../types/room";
import { roomTypes, roomState } from "../types/room";
import socket from "../../config/socketio";

export const initialize = () => {
	return async (dispatch: any) => {
		dispatch({
			type: SET_JOINING,
			payload: true,
		});

		socket.emit("initialize");
	};
};

export const setRoomData = ({ _id, type, messages }: roomState) => {
	return async (dispatch: any) => {
		dispatch({
			type: SET_ROOM_DATA,
			payload: { _id, type, messages },
		});

		dispatch({
			type: SET_JOINING,
			payload: false,
		});
	};
};
