import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/rootReducer";
import "./ChatWindow.scss";

import { Message } from "../../containers";
import { MessageI } from "../../types";

interface Props {}

const ChatWindow: React.FC<Props> = () => {
	const messages = useSelector((state: RootState) => state.room.messages);
	const currentUser = useSelector((state: RootState) => state.auth.username);

	return (
		<div className="chatWindowContainer">
			<div className="chatWindow">
				{messages && currentUser && messages.length > 0 ? (
					messages.map((message, i) => {
						const prevMessage = i > 0 ? messages[i - 1] : undefined;
						return <Message key={message._id} currentUser={currentUser} message={message} prevMessage={prevMessage} />;
					})
				) : (
					<h3>No messages</h3>
				)}
			</div>
		</div>
	);
};

export default ChatWindow;
