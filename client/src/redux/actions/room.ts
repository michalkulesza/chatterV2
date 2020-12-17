import { JOIN_ROOM, SET_JOINING } from "../types/room";
import { roomTypes } from "../types/room";
import socket from "../../config/socketio";

export const joinRoom = (room: roomTypes) => {
	return async (dispatch: any) => {
		dispatch({
			type: SET_JOINING,
			payload: true,
		});

		socket.emit("joinRoom", room);
	};
};
