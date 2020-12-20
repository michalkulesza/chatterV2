import { ADD_MESSGAE, CLEAR_ROOM, SET_JOINING, SET_ROOM_DATA, switchRoomAction } from "../types/room";
import { roomState } from "../types/room";
import socket from "../../config/socketio";
import { MessageI } from "../../types";

export const initialize = (username: string, registered: boolean) => {
	return async (dispatch: any) => {
		dispatch({
			type: SET_JOINING,
			payload: true,
		});

		socket.emit("initialize", username, registered);
	};
};

export const setRoomData = ({ _id, type, messages, users }: roomState) => {
	return async (dispatch: any) => {
		dispatch({
			type: SET_ROOM_DATA,
			payload: { _id, type, messages, users },
		});

		dispatch({
			type: SET_JOINING,
			payload: false,
		});
	};
};

export const addMessage = (message: MessageI) => {
	return async (dispatch: any) => {
		dispatch({
			type: ADD_MESSGAE,
			payload: message,
		});
	};
};

export const sendMessage = (message: MessageI) => {
	return async (dispatch: any) => {
		dispatch({
			type: ADD_MESSGAE,
			payload: message,
		});

		socket.emit("message", message);
	};
};

export const clearRoom = () => {
	return {
		type: CLEAR_ROOM,
	};
};

export const joinPrivate = (arr: string[]) => {
	return async (dispatch: any) => {
		dispatch({
			type: SET_JOINING,
			payload: true,
		});

		socket.emit("joinPrivate", arr);
	};
};

export const switchRooms = (room: string) => {
	return async (dispatch: any) => {
		dispatch({
			type: SET_JOINING,
			payload: true,
		});

		socket.emit("switchRooms", room);
	};
};
