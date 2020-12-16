import React from "react";
import "./ChatContainer.scss";

import { Mainbar } from "../../containers";

interface Props {}

const ChatContainer: React.FC<Props> = () => {
	return (
		<div className="chatContainer">
			<Mainbar></Mainbar>
		</div>
	);
};

export default ChatContainer;
