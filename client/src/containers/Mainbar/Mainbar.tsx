import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/actions/ui";
import { RootState } from "../../redux/reducers/rootReducer";

import { Button } from "../../components";
import { Badge } from "../../components";

import { IoCloseOutline } from "react-icons/io5";
import { BiMenuAltLeft } from "react-icons/bi";
import "./Mainbar.scss";

interface Props {}

const Mainbar: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const { type: roomType, users: usersInRoom, _id: roomName } = useSelector((state: RootState) => state.room);
	const sidebarVisible = useSelector((state: RootState) => state.ui.sidebarVisible);
	const currentUser = useSelector((state: RootState) => state.user.username);
	const onlineUsers = useSelector((state: RootState) => state.misc.userList);

	const partnersName = usersInRoom.filter(user => user !== currentUser)[0];
	const isPartnerOnline = onlineUsers.some(user => user.name === partnersName);

	const handleButtonClick = () => dispatch(toggleSidebar());

	return (
		<header className="mainbar">
			<Button color="transparent" type="square" svgSize="large" onMouseDown={handleButtonClick}>
				{sidebarVisible ? <IoCloseOutline /> : <BiMenuAltLeft />}
			</Button>
			<div className="chatInfo">
				<h2>
					{roomName === "Main"
						? "Main chat"
						: roomType === "room"
						? `${roomName} chat`
						: roomType === "private"
						? `Chatting with ${partnersName}`
						: ""}
				</h2>
				<Badge>
					{roomName === "Main" ? "Public" : roomType === "room" ? "Private" : roomType === "private" ? "Direct" : ""}
				</Badge>
				{roomName !== "Main" && (
					<Badge color={isPartnerOnline ? "green" : "gray"}>{isPartnerOnline ? "online" : "offline"}</Badge>
				)}
			</div>
		</header>
	);
};

export default Mainbar;
