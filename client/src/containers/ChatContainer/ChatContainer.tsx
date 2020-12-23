import React, { useEffect } from "react";
import socket from "../../config/socketio";
import { useDispatch, useSelector } from "react-redux";

import { addMessage, clearRoom, initialize, setRoomData, lockRoom, setMessageDeleted } from "../../redux/actions/room";
import { addUserRoom, clearUser, setUserRooms, updateLockRoomOnList } from "../../redux/actions/auth";
import { clearMisc, setUserList } from "../../redux/actions/misc";
import { roomState } from "../../redux/types/room";
import { MessageI, UserI } from "../../types";
import { userRoomI } from "../../redux/types/auth";
import { RootState } from "../../redux/reducers/rootReducer";

import { Mainbar, ChatWindow, Input } from "../../containers";
import "./ChatContainer.scss";

interface Props {}

const ChatContainer: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const { username, registered } = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		username && dispatch(initialize(username, registered));

		socket.on("initialData", ({ _id, type, messages, users = [], locked }: roomState) => {
			dispatch(setRoomData({ _id, type, messages, users, locked }));
		});

		socket.on("userRooms", (rooms: userRoomI[]) => dispatch(setUserRooms(rooms)));

		socket.on("addUserRoom", (room: userRoomI) => dispatch(addUserRoom(room)));

		socket.on("userList", (users: UserI[]) => dispatch(setUserList(users)));

		socket.on("message", (message: MessageI) => dispatch(addMessage(message)));

		socket.on("setMessageDeleted", (id: string) => dispatch(setMessageDeleted(id)));

		socket.on("requestToJoinRoom", (roomName: string) => socket.emit("joinRoom", roomName));

		socket.on("lockRoom", (roomName: string) => {
			dispatch(lockRoom(roomName));
			dispatch(updateLockRoomOnList(roomName));
		});

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
