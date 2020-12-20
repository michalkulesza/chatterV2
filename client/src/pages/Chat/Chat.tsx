import React from "react";
import { useSelector } from "react-redux";
import { roomState } from "../../redux/types/room";

import { Overlay } from "../../components";
import { ChatContainer, Sidebar } from "../../containers";

import "./Chat.scss";

interface Props {}

const Chat: React.FC<Props> = () => {
	const loadingData = useSelector((state: roomState) => state.joining);

	return (
		<div className="chat">
			{loadingData && <Overlay />}
			<Sidebar></Sidebar>
			<ChatContainer></ChatContainer>
		</div>
	);
};

export default Chat;
