import React, { useEffect } from "react";
import socket from "../../config/socketio";
import { useDispatch, useSelector } from "react-redux";
import { initialize, setRoomData } from "../../redux/actions/room";
import { UserI } from "../../types";

import { Mainbar, ChatWindow, Input } from "../../containers";
import "./ChatContainer.scss";
import { roomState } from "../../redux/types/room";
import { RootState } from "../../redux/reducers/rootReducer";
import { setUserList } from "../../redux/actions/misc";
import { setUserRooms } from "../../redux/actions/auth";

interface Props {}

const ChatContainer: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const username = useSelector((state: RootState) => state.auth.username);

	useEffect(() => {
		username && dispatch(initialize(username));

		socket.on("initialData", ({ _id, type, messages }: roomState) => dispatch(setRoomData({ _id, type, messages })));

		socket.on("userRooms", (rooms: string[]) => dispatch(setUserRooms(rooms)));

		socket.on("userList", (users: UserI[]) => dispatch(setUserList(users)));
	}, []);

	return (
		<div className="chatContainer">
			<Mainbar></Mainbar>
			<ChatWindow></ChatWindow>
			<Input></Input>
		</div>
	);
};

export default ChatContainer;
