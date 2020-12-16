import React from "react";
import "./Chat.scss";

import { ChatWindow, Sidebar } from "../../containers";

interface Props {}

const Chat: React.FC<Props> = () => {
	return (
		<div className="chat">
			<Sidebar></Sidebar>
			<ChatWindow></ChatWindow>
		</div>
	);
};

export default Chat;
