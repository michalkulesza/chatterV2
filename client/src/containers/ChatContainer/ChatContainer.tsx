import React from "react";
import "./ChatContainer.scss";

import { Mainbar, Chat, Input } from "../../containers";

interface Props {}

const ChatContainer: React.FC<Props> = () => {
	return (
		<div className="chatContainer">
			<Mainbar></Mainbar>
			<Chat></Chat>
			<Input></Input>
		</div>
	);
};

export default ChatContainer;
