import React from "react";
import { userRoomI } from "../../redux/types/user";

import { FaLock } from "react-icons/fa";
import "./Room.scss";

interface Props {
	data: userRoomI;
	unreadCount?: number;
	currentUser?: string;
	handler: (room: string) => void;
}

const Room: React.FC<Props> = ({ data, unreadCount, currentUser, handler }) => {
	return (
		<div className="room" onMouseDown={() => handler(data._id)}>
			<div className="left">
				{data.type === "private" && data.users ? data.users.filter(user => user !== currentUser) : data._id}
				{data.locked && <FaLock />}
			</div>
			{unreadCount && <div className="right">{unreadCount}</div>}
		</div>
	);
};

export default Room;
