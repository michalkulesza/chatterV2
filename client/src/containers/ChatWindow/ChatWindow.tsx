import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/rootReducer";
import "./ChatWindow.scss";

interface Props {}

const ChatWindow: React.FC<Props> = () => {
	const messages = useSelector((state: RootState) => state.room.messages);

	return (
		<div className="chatWindow">
			{messages && messages.length > 0 ? messages.map(message => <span>{message.content}</span>) : <h3>No messages</h3>}
		</div>
	);
};

export default ChatWindow;
