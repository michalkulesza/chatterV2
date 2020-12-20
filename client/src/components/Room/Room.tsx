import React from "react";
import { userRoomI } from "../../redux/types/auth";
import "./Room.scss";

interface Props {
	data: userRoomI;
	currentUser?: string;
}

const Room: React.FC<Props> = ({ data, currentUser }) => {
	return data.type === "private" && data.users ? (
		<div className="room">{data.users.filter(user => user !== currentUser)}</div>
	) : (
		<div className="room">{data._id}</div>
	);
};

export default Room;
