import React from "react";
import "./Chat.scss";

import { ChatContainer, Sidebar } from "../../containers";

interface Props {}

const Chat: React.FC<Props> = () => {
	return (
		<div className="chat">
			<Sidebar></Sidebar>
			<ChatContainer></ChatContainer>
		</div>
	);
};

export default Chat;
