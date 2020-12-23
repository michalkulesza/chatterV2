export interface MessageI {
	_id: string;
	author: {
		name: string;
		picture: string;
	};
	content: string;
	created: string;
	seenBy?: UserI[];
	deleted?: boolean;
}

export interface UserI {
	_id: string;
	name: string;
	registered: boolean;
	profileImage: string;
}

export interface RoomI {
	name: string;
	type: "room" | "private";
	users?: UserI[];
	messages?: MessageI[];
}
