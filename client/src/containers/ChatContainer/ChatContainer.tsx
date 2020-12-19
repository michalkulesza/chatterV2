import React, { useEffect } from "react";
import socket from "../../config/socketio";
import { useDispatch, useSelector } from "react-redux";

import { addMessage, clearRoom, initialize, setRoomData } from "../../redux/actions/room";
import { roomState } from "../../redux/types/room";
import { RootState } from "../../redux/reducers/rootReducer";
import { clearMisc, setUserList } from "../../redux/actions/misc";
import { clearUser, setUserRooms } from "../../redux/actions/auth";
import { MessageI, UserI } from "../../types";

import { Mainbar, ChatWindow, Input } from "../../containers";
import "./ChatContainer.scss";

interface Props {}

const ChatContainer: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const username = useSelector((state: RootState) => state.auth.username);
	const registered = useSelector((state: RootState) => state.auth.registered);

	useEffect(() => {
		username && dispatch(initialize(username, registered));

		socket.on("initialData", ({ _id, type, messages, users = [] }: roomState) =>
			dispatch(setRoomData({ _id, type, messages, users }))
		);

		socket.on("userRooms", (rooms: string[]) => dispatch(setUserRooms(rooms)));

		socket.on("userList", (users: UserI[]) => dispatch(setUserList(users)));

		socket.on("message", (message: MessageI) => dispatch(addMessage(message)));

		socket.on("disconnect", () => {
			dispatch(clearUser());
			dispatch(clearMisc());
			dispatch(clearRoom());
		});

		return () => {
			socket.removeAllListeners();
		};
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
