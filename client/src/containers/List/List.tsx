import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { joinPrivate, switchRooms } from "../../redux/actions/room";
import { RootState } from "../../redux/reducers/rootReducer";
import { userRoomI } from "../../redux/types/user";
import { UserI } from "../../types";

import { User, Room } from "../../components";
import Header from "./Header/Header";

import "./List.scss";

interface Props {
	type: "users" | "rooms";
	usersData?: UserI[];
	roomsData?: userRoomI[];
}

const List: React.FC<Props> = ({ type, usersData, roomsData }) => {
	const dispatch = useDispatch();
	const listRef = useRef<HTMLDivElement>(null);

	const currentUser = useSelector((state: RootState) => state.user.username);
	const [collapsed, setCollapsed] = useState(false);

	const handleUserClick = (usersName: string, partnersName: string) => dispatch(joinPrivate([usersName, partnersName]));
	const handleRoomClick = (room: string) => dispatch(switchRooms(room));
	const handleCollapse = () => setCollapsed(!collapsed);

	const style = {
		transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
	};

	const collapsedStyle = {
		transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
		marginTop: `-${listRef?.current?.clientHeight}px`,
		pointerEvents: "none",
		opacity: "0",
	};

	return (type === "users" && usersData) || (type === "rooms" && roomsData) ? (
		<div className="list">
			<Header handleCollapse={handleCollapse} collapsed={collapsed} type={type} />
			<div className="main" style={collapsed ? collapsedStyle : style} ref={listRef}>
				{type === "users" &&
					currentUser &&
					usersData &&
					usersData?.map((user: UserI) => (
						<User
							key={user.name}
							currentUser={currentUser}
							name={user.name}
							handler={handleUserClick}
							registered={user.registered}
						/>
					))}
				{type === "rooms" &&
					roomsData &&
					roomsData?.map((room: userRoomI) => (
						<Room key={room._id} data={room} currentUser={currentUser} handler={handleRoomClick} />
					))}
			</div>
		</div>
	) : null;
};

export default List;
