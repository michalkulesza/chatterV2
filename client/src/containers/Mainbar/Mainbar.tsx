import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/actions/ui";
import { RootState } from "../../redux/reducers/rootReducer";

import { Button } from "../../components";

import { IoCloseOutline } from "react-icons/io5";
import { BiMenuAltLeft } from "react-icons/bi";
import "./Mainbar.scss";

interface Props {}

const Mainbar: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const sidebarVisible = useSelector((state: RootState) => state.ui.sidebarVisible);
	const currentUser = useSelector((state: RootState) => state.auth.username);
	const { type: roomType, users: usersInRoom, _id: roomName } = useSelector((state: RootState) => state.room);
	const allUsers = useSelector((state: RootState) => state.misc.userList);

	const partnersName = usersInRoom.filter(user => user !== currentUser);

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
				<span>
					{roomName === "Main" ? "Public" : roomType === "room" ? "Private" : roomType === "private" ? "Direct" : ""}
				</span>
			</div>
		</header>
	);
};

export default Mainbar;
