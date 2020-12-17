export interface MessageI {
	_id: string;
	author: string;
	content: string;
	created: string;
	seenBy?: UserI[];
}

export interface UserI {
	_id: string;
	name: string;
}

export interface RoomI {
	name: string;
	type: "room" | "private";
	users?: UserI[];
	messages?: MessageI[];
}
