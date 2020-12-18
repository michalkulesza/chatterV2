import React, { useState } from "react";
import Moment from "react-moment";
import "./Message.scss";

import { MessageI } from "../../types";

interface Props {
	currentUser: string;
	message: MessageI;
	prevMessage?: MessageI;
}

const Message: React.FC<Props> = ({ currentUser, message, prevMessage }) => {
	const [collapsed, setCollapsed] = useState(true);

	const fromMyself = currentUser === message.author;
	const fromAdmin = message.author === "admin";
	const fromPartner = currentUser !== message.author && !fromAdmin;
	const authorClass = `${fromMyself && "fromMyself"} ${fromAdmin && "fromAdmin"} ${fromPartner && "fromPartner"}`;

	const fromTheSameUser = prevMessage && prevMessage.author === message.author;

	const handleMessageClick = () => setCollapsed(!collapsed);

	return (
		<div className={`messageContainer ${authorClass}`}>
			<div className={`messageWrapper ${authorClass}`}>
				{fromPartner && !fromTheSameUser && <span>{message.author}</span>}
				<div className="message" onMouseDown={handleMessageClick}>
					{message.content}
				</div>
				{!fromAdmin && (
					<span className={`${collapsed && "collapsed"}`}>
						<Moment fromNow interval={10000}>
							{message.created}
						</Moment>
					</span>
				)}
			</div>
		</div>
	);
};

export default Message;
