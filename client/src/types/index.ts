export interface MessageI {
	_id: string;
	author: string;
	content: string;
	created: string;
	seenBy?: UserI[];
	deleted?: boolean;
}

export interface UserI {
	_id: string;
	name: string;
	registered: boolean;
}

export interface RoomI {
	name: string;
	type: "room" | "private";
	users?: UserI[];
	messages?: MessageI[];
}
