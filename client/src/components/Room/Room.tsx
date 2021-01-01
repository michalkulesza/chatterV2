import React from "react";
import { userRoomI } from "../../redux/types/user";

import { UserI } from "../../types";
import { FaLock } from "react-icons/fa";
import "./Room.scss";
import Badge from "../Badge/Badge";

interface Props {
	data: userRoomI;
	currentlyOnlineUsers: UserI[] | [];
	unreadCount?: number;
	currentUser?: string;
	handler: (room: string) => void;
}

const Room: React.FC<Props> = ({ data, currentlyOnlineUsers, unreadCount, currentUser, handler }) => {
	const partner = data.users && data.users.filter(user => user !== currentUser);
	const isPartnerOnline = partner && currentlyOnlineUsers.some(user => user.name === partner[0]);

	return (
		<div className="room" onMouseDown={() => handler(data._id)}>
			<div className="left">
				{data.type === "private" && partner ? partner[0] : data._id}
				{data.locked && <FaLock />}
			</div>
			<div className="right">
				{unreadCount && <div className="unreadMessages">{unreadCount}</div>}
				{data.type === "private" && isPartnerOnline ? (
					<Badge color="green">Online</Badge>
				) : data.type === "private" && !isPartnerOnline ? (
					<Badge color="gray">Offline</Badge>
				) : null}
			</div>
		</div>
	);
};

export default Room;
