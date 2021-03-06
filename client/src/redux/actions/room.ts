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
	SET_LOADING_PAGE,
} from "../types/room";
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

export const setRoomData = ({ _id, type, messages, users, locked, currentPage, pagesLeft }: roomState) => {
	return async (dispatch: any) => {
		dispatch({
			type: SET_ROOM_DATA,
			payload: { _id, type, messages, users, locked },
		});

		dispatch({
			type: SET_CURRENT_PAGE,
			payload: currentPage,
		});

		dispatch({
			type: SET_PAGES_LEFT,
			payload: pagesLeft,
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

export const sendMessage = (room: string, message: MessageI) => {
	return async () => {
		socket.emit("message", { room, message });
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

export const addReaction = (messageID: string, reaction: string) => {
	return async (dispatch: any) => {
		dispatch({
			type: ADD_REACTION,
			payload: {
				reaction,
				messageID,
			},
		});
	};
};

export const removeReaction = (messageID: string, reaction: string) => {
	return async (dispatch: any) => {
		dispatch({
			type: REMOVE_REACTION,
			payload: {
				reaction,
				messageID,
			},
		});
	};
};

export const addMoreMessages = (messages: MessageI[], page: number, pagesLeft: number) => {
	return async (dispatch: any) => {
		dispatch({
			type: SET_CURRENT_PAGE,
			payload: page,
		});

		dispatch({
			type: SET_PAGES_LEFT,
			payload: pagesLeft,
		});

		dispatch({
			type: ADD_MESSAGES_AT_BEGINNING,
			payload: messages,
		});

		dispatch({
			type: SET_LOADING_PAGE,
			payload: false,
		});
	};
};

export const setLoadingPage = (val: boolean) => {
	return {
		type: SET_LOADING_PAGE,
		payload: val,
	};
};
