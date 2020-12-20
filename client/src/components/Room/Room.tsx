import React from "react";
import { userRoomI } from "../../redux/types/auth";
import "./Room.scss";

interface Props {
	data: userRoomI;
	currentUser?: string;
	handler: (room: string) => (dispatch: any) => Promise<void>;
}

const Room: React.FC<Props> = ({ data, currentUser, handler }) => {
	return data.type === "private" && data.users ? (
		<div className="room" onMouseDown={() => handler(data._id)}>
			{data.users.filter(user => user !== currentUser)}
		</div>
	) : (
		<div className="room" onMouseDown={() => handler(data._id)}>
			{data._id}
		</div>
	);
};

export default Room;
