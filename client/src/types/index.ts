export interface MessageI {
	_id: string;
	author: {
		name: string;
		picture: string;
	};
	content: string;
	created: string;
	deleted?: boolean;
	reactions: ReactionsI;
	image: string | null;
	giphyID: React.ReactText | null;
}

export interface UsersMessageReactionsI {
	messageID: string;
	reaction: string;
}

export interface UserI {
	_id: string;
	name: string;
	registered: boolean;
	profileImage: string;
	reactions: UsersMessageReactionsI[];
}

export interface RoomI {
	name: string;
	type: "room" | "private";
	users?: UserI[];
	messages?: MessageI[];
}

export interface ReactionsI {
	"+1": number;
	heart: number;
	rolling_on_the_floor_laughing: number;
	slightly_frowning_face: number;
}
