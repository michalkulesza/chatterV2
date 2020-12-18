import React from "react";
import "./Message.scss";

import { MessageI } from "../../types";

interface Props {
	currentUser: string;
	message: MessageI;
	prevMessage?: MessageI;
}

const Message: React.FC<Props> = ({ currentUser, message, prevMessage }) => {
	const fromMyself = currentUser === message.author;
	const fromAdmin = message.author === "admin";
	const fromPartner = currentUser !== message.author && !fromAdmin;
	const authorClass = `${fromMyself && "fromMyself"} ${fromAdmin && "fromAdmin"} ${fromPartner && "fromPartner"}`;

	const fromTheSameUser = prevMessage && prevMessage.author === message.author;

	return (
		<div className={`messageContainer ${authorClass}`}>
			<div className={`messageWrapper ${authorClass}`}>
				{fromPartner && !fromTheSameUser && <span>{message.author}</span>}
				<div className="message">{message.content}</div>
				{!fromAdmin && <span>8 min ago</span>}
			</div>
		</div>
	);
};

export default Message;
