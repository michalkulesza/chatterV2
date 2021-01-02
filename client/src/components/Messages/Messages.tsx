import React from "react";
import { MessageI } from "../../types";
import { Message } from "../../containers";
import "./Messages.scss";

interface Props {
	messages: MessageI[];
	isDisabled?: boolean;
}

const Messages: React.FC<Props> = ({ messages, isDisabled }) => {
	return (
		<div className="messages">
			{messages.map((message, i) => {
				const prevMessage = i > 0 ? messages[i - 1] : undefined;
				const nextMessage = i < messages.length ? messages[i + 1] : undefined;
				return (
					<Message
						key={message._id}
						message={message}
						prevMessage={prevMessage}
						deleteDisabled={isDisabled && isDisabled}
						marginBottom={nextMessage && nextMessage.author.name !== message.author.name}
					/>
				);
			})}
		</div>
	);
};

export default Messages;
