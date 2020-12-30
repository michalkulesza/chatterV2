import React, { useEffect } from "react";
import socket from "../../config/socketio";
import { useDispatch, useSelector } from "react-redux";

import {
	addMessage,
	clearRoom,
	initialize,
	setRoomData,
	lockRoom,
	setMessageDeleted,
	addReaction,
	removeReaction,
} from "../../redux/actions/room";
import { addUserRoom, clearUser, setUserReactions, setUserRooms, updateLockRoomOnList } from "../../redux/actions/user";
import { clearMisc, setUserList } from "../../redux/actions/misc";
import { clearUI } from "../../redux/actions/ui";
import { MessageI, UserI, UsersMessageReactionsI } from "../../types";
import { roomState } from "../../redux/types/room";
import { userRoomI } from "../../redux/types/user";
import { RootState } from "../../redux/reducers/rootReducer";

import { Mainbar, ChatWindow, Input } from "../../containers";
import "./ChatContainer.scss";

interface Props {}

const ChatContainer: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const { username, registered } = useSelector((state: RootState) => state.user);
	const { _id: currentRoom } = useSelector((state: RootState) => state.room);

	useEffect(() => {
		username && dispatch(initialize(username, registered));

		socket.on("initialData", ({ _id, type, messages, users = [], locked }: roomState) => {
			dispatch(setRoomData({ _id, type, messages, users, locked }));
		});

		socket.on("userRooms", (rooms: userRoomI[]) => dispatch(setUserRooms(rooms)));

		socket.on("addUserRoom", (room: userRoomI) => dispatch(addUserRoom(room)));

		socket.on("userList", (users: UserI[]) => dispatch(setUserList(users)));

		socket.on("userReactions", (reactions: UsersMessageReactionsI) => dispatch(setUserReactions(reactions)));

		socket.on("addReaction", ({ messageID, reaction }: { messageID: string; reaction: string }) =>
			dispatch(addReaction(messageID, reaction))
		);

		socket.on("removeReaction", ({ messageID, reaction }: { messageID: string; reaction: string }) =>
			dispatch(removeReaction(messageID, reaction))
		);

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
			dispatch(clearUI());
		});

		return () => {
			socket.removeAllListeners();
		};
	}, []);

	useEffect(() => {
		if (currentRoom) {
			socket.on("message", ({ room, message }: { room: string; message: MessageI }) => {
				room === currentRoom && dispatch(addMessage(message));
			});
		}

		return () => {
			socket.removeListener("message");
		};
	}, [currentRoom]);

	return (
		<div className="chatContainer">
			<Mainbar></Mainbar>
			<ChatWindow></ChatWindow>
			<Input></Input>
		</div>
	);
};

export default ChatContainer;
