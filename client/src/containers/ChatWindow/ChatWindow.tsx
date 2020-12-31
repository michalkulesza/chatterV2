import React from "react";
import { useDispatch } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/rootReducer";

import { Message } from "../../containers";

import { RiChat1Line } from "react-icons/ri";
import { IoLockClosed } from "react-icons/io5";
import { BsArrowBarUp } from "react-icons/bs";
import "./ChatWindow.scss";
import { Button } from "../../components";
import { addMoreMessages, setLoadingPage } from "../../redux/actions/room";
import socket from "../../config/socketio";

interface Props {}

const ChatWindow: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const { messages, locked, currentPage, pagesLeft, loadingPage } = useSelector((state: RootState) => state.room);
	const currentUser = useSelector((state: RootState) => state.user.username);

	const handleLoadMoreClick = () => {
		dispatch(setLoadingPage(true));
		socket.emit("getMoreMessages", { page: currentPage + 1 });
	};

	return (
		<ScrollToBottom className="chatWindowContainer">
			<div className="chatWindow">
				{pagesLeft > 0 && (
					<div className="loadMore">
						<Button loading={loadingPage} color="transparent" onMouseDown={handleLoadMoreClick}>
							<BsArrowBarUp /> Load more messages
						</Button>
					</div>
				)}
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
						<div className="text">Chat has been locked.</div>
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
