import React from "react";
import { RootState } from "../../redux/reducers/rootReducer";
import { useSelector } from "react-redux";

import { ChatContainer, Sidebar } from "../../containers";
import { Overlay } from "../../components";
import "./Chat.scss";

interface Props {}

const Chat: React.FC<Props> = () => {
	const { loading } = useSelector((state: RootState) => state.ui);

	return (
		<div className="chat">
			{loading === true && <Overlay />}
			<Sidebar></Sidebar>
			<ChatContainer></ChatContainer>
		</div>
	);
};

export default Chat;
