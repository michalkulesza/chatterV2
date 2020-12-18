import React, { useState, useRef } from "react";
import "./List.scss";

import { User, Room } from "../../components";
import { UserI, RoomI } from "../../types";

import { FiUsers } from "react-icons/fi";
import { RiChat1Line } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";

interface Props {
	type: "users" | "rooms";
	usersData?: UserI[];
	roomsData?: string[];
}

const List: React.FC<Props> = ({ type, usersData, roomsData }) => {
	const listRef = useRef<HTMLDivElement>(null);
	const [collapsed, setCollapsed] = useState(false);

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
				{type === "users" && usersData && usersData?.map((user: UserI) => <User key={user.name} name={user.name} />)}
				{type === "rooms" && roomsData && roomsData?.map((room: string) => <Room key={room} name={room} />)}
			</div>
		</div>
	) : null;
};

export default List;
