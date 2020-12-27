import { ADD_MESSGAE, CLEAR_ROOM, SET_ROOM_DATA, LOCK_ROOM, SET_MESSAGE_DELETED, ADD_REACTION } from "../types/room";
import { SET_LOADING } from "../types/user";
import { roomState } from "../types/room";
import socket from "../../config/socketio";
import { MessageI } from "../../types";

export const initialize = (username: string, registered: boolean) => {
	return async (dispatch: any) => {
		dispatch({
			type: SET_LOADING,
			payload: true,
		});

		socket.emit("initialize", username, registered);
	};
};

export const setRoomData = ({ _id, type, messages, users, locked }: roomState) => {
	return async (dispatch: any) => {
		dispatch({
			type: SET_ROOM_DATA,
			payload: { _id, type, messages, users, locked },
		});

		dispatch({
			type: SET_LOADING,
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
	return async () => {
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
			type: SET_LOADING,
			payload: true,
		});

		socket.emit("joinPrivate", arr);
	};
};

export const switchRooms = (room: string) => {
	return async (dispatch: any) => {
		dispatch({
			type: SET_LOADING,
			payload: true,
		});

		socket.emit("switchRooms", room);
	};
};

export const lockRoom = (room: string) => {
	return {
		type: LOCK_ROOM,
		payload: room,
	};
};

export const deleteMessage = (roomName: string, id: string) => {
	return async (dispatch: any) => {
		dispatch({
			type: SET_MESSAGE_DELETED,
			payload: id,
		});

		socket.emit("setMessageAsDeleted", { roomName, id });
	};
};

export const setMessageDeleted = (id: string) => {
	return {
		type: SET_MESSAGE_DELETED,
		payload: id,
	};
};

export const addReaction = (username: string, room: string, messageID: string, reaction: string) => {
	return async (dispatch: any) => {
		dispatch({
			type: ADD_REACTION,
			payload: {
				reaction,
				messageID,
			},
		});

		socket.emit("addReaction", { username, room, messageID, reaction });
	};
};
