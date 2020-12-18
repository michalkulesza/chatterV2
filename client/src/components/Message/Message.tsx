import React from "react";
import "./Message.scss";

import { MessageI } from "../../types";

interface Props {
	currentUser: string;
	message: MessageI;
}

const Message: React.FC<Props> = ({ currentUser, message }) => {
	const fromMyself = currentUser === message.author;
	const fromAdmin = message.author === "admin";
	const fromPartner = currentUser !== message.author && !fromAdmin;
	const authorClass = `${fromMyself && "fromMyself"} ${fromAdmin && "fromAdmin"} ${fromPartner && "fromPartner"}`;

	return (
		<div className={`messageContainer ${authorClass}`}>
			<div className={`message ${authorClass}`}>{message.content}</div>
		</div>
	);
};

export default Message;
