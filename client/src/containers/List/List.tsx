import React from "react";
import "./List.scss";

import { User, Room } from "../../components";
import { UserI, RoomI } from "../../types";
import { FiUsers } from "react-icons/fi";
import { RiChat1Line } from "react-icons/ri";

interface Props {
	type: "users" | "rooms";
	usersData?: UserI[];
	roomsData?: RoomI[];
}

const List: React.FC<Props> = ({ type, usersData, roomsData }) => {
	return (type === "users" && usersData) || (type === "rooms" && roomsData) ? (
		<div className="list">
			<h4 className="title">
				<div className="icon">{type === "users" ? <FiUsers /> : <RiChat1Line />}</div>
				{type === "users" ? "Users" : "Conversations"}
			</h4>
			{type === "users" && usersData && usersData?.map((user: UserI) => <User key={user._id} name={user.name} />)}
			{type === "rooms" && roomsData && roomsData?.map((room: RoomI) => <Room key={room.name} name={room.name} />)}
		</div>
	) : null;
};

export default List;
