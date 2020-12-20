import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./List.scss";

import { User, Room } from "../../components";
import { UserI, RoomI } from "../../types";

import { FiUsers } from "react-icons/fi";
import { RiChat1Line } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { RootState } from "../../redux/reducers/rootReducer";
import { joinPrivate } from "../../redux/actions/room";
import { userRoomI } from "../../redux/types/auth";

interface Props {
	type: "users" | "rooms";
	usersData?: UserI[];
	roomsData?: userRoomI[];
}

const List: React.FC<Props> = ({ type, usersData, roomsData }) => {
	const dispatch = useDispatch();
	const listRef = useRef<HTMLDivElement>(null);
	const currentUser = useSelector((state: RootState) => state.auth.username);
	const [collapsed, setCollapsed] = useState(false);

	const handleCollapse = () => setCollapsed(!collapsed);
	const handleUserClick = (usersName: string, partnersName: string) => dispatch(joinPrivate([usersName, partnersName]));

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
			<header onMouseDown={handleCollapse}>
				<h4 className="title">
					<div className="icon">{type === "users" ? <FiUsers /> : <RiChat1Line />}</div>
					{type === "users" ? "Users" : "Conversations"}
				</h4>
				<button className={`collapseButton ${collapsed && "active"}`}>
					<BiChevronDown />
				</button>
			</header>

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
					roomsData?.map((room: userRoomI) => <Room key={room._id} data={room} currentUser={currentUser} />)}
			</div>
		</div>
	) : null;
};

export default List;
