import { ADD_MESSGAE, JOIN_ROOM, SET_JOINING, SET_ROOM_DATA } from "../types/room";
import { roomTypes, roomState } from "../types/room";
import socket from "../../config/socketio";
import { MessageI } from "../../types";

export const initialize = (username: string) => {
	return async (dispatch: any) => {
		dispatch({
			type: SET_JOINING,
			payload: true,
		});

		socket.emit("initialize", username);
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
