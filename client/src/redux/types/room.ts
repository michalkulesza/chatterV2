export const JOIN_ROOM = "JOIN_ROOM";
export const JOIN_PRIVATE = "JOIN_PRIVATE";
export const SEND_MESSAGE = "SEND_MESSAGE";
export const ADD_MESSGAE = "ADD_MESSGAE";
export const SET_ROOM_DATA = "SET_ROOM_DATA";
export const SET_JOINING = "SET_JOINING";

import { MessageI } from "../../types/index";

export interface roomState {
	joining?: boolean;
	_id?: string;
	type?: "room" | "private";
	messages?: MessageI[];
	directUsers?: string[];
}

export interface initializeAction {
	type: typeof JOIN_ROOM;
}

export interface setJoiningAction {
	type: typeof SET_JOINING;
	payload: boolean;
}

export interface setRoomData {
	type: typeof SET_ROOM_DATA;
	payload: roomState;
}

export type roomTypes = initializeAction | setJoiningAction | setRoomData;
