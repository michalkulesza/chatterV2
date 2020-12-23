import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/rootReducer";

import { Message } from "../../containers";

import { RiChat1Line } from "react-icons/ri";
import { IoLockClosed } from "react-icons/io5";
import "./ChatWindow.scss";
import { MessageI } from "../../types";

interface Props {}

const ChatWindow: React.FC<Props> = () => {
	const { messages, locked } = useSelector((state: RootState) => state.room);
	const currentUser = useSelector((state: RootState) => state.auth.username);

	return (
		<ScrollToBottom className="chatWindowContainer">
			<div className="chatWindow">
				{currentUser && messages?.length > 0 ? (
					messages.map((message, i) => {
						const prevMessage = i > 0 ? messages[i - 1] : undefined;
						const nextMessage = i < messages.length ? messages[i + 1] : undefined;
						return (
							<Message
								key={message._id}
								message={message}
								prevMessage={prevMessage}
								deleteDisabled={locked}
								marginBottom={nextMessage && nextMessage.author.name !== message.author.name}
							/>
						);
					})
				) : (
					<div className="notice">
						<div className="icon">
							<RiChat1Line />
						</div>
						<div className="text">No messages yet</div>
						<div className="text">Be a first one to start the conversation!</div>
					</div>
				)}
				{locked && (
					<div className="notice">
						<div className="icon">
							<IoLockClosed />
						</div>
						<div className="text">Chat had been locked.</div>
						<div className="text">
							To continue chatting and keep your messages saved
							<br />
							make sure that both of users are registered!
						</div>
					</div>
				)}
			</div>
		</ScrollToBottom>
	);
};

export default ChatWindow;
