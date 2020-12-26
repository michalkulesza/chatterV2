export const JOIN_ROOM = "JOIN_ROOM";
export const JOIN_PRIVATE = "JOIN_PRIVATE";
export const SEND_MESSAGE = "SEND_MESSAGE";
export const ADD_MESSGAE = "ADD_MESSGAE";
export const SET_MESSAGE_DELETED = "SET_MESSAGE_DELETED";
export const SET_ROOM_DATA = "SET_ROOM_DATA";
export const CLEAR_ROOM = "CLEAR_ROOM";
export const SWITCH_ROOM = "SWITCH_ROOM";
export const LOCK_ROOM = "LOCK_ROOM";
export const ADD_REACTION = "ADD_REACTION";

import { MessageI } from "../../types/index";

export interface roomState {
	_id?: string;
	type?: "room" | "private";
	messages: MessageI[];
	users: string[] | [];
	locked: boolean;
}

export interface initializeAction {
	type: typeof JOIN_ROOM;
}

export interface setRoomData {
	type: typeof SET_ROOM_DATA;
	payload: roomState;
}

export interface addMessageAction {
	type: typeof ADD_MESSGAE;
	payload: MessageI;
}

export interface clearRoomAction {
	type: typeof CLEAR_ROOM;
}

export interface joinPrivateRoomAction {
	type: typeof JOIN_PRIVATE;
	payload: string[];
}

export interface switchRoomAction {
	type: typeof CLEAR_ROOM;
	// payload: string[];
}

export interface lockRoomAction {
	type: typeof LOCK_ROOM;
	payload: string;
}

export interface setMessageDeletedAction {
	type: typeof SET_MESSAGE_DELETED;
	payload: string;
}

export interface addReactionAction {
	type: typeof ADD_REACTION;
	payload: {
		reaction: "+1" | "heart" | "rolling_on_the_floor_laughing" | "slightly_frowning_face";
		messageID: string;
	};
}

export type roomTypes =
	| initializeAction
	| setRoomData
	| addMessageAction
	| clearRoomAction
	| joinPrivateRoomAction
	| switchRoomAction
	| setMessageDeletedAction
	| lockRoomAction
	| addReactionAction;
