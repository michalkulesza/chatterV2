import React, { useState } from "react";
import { MessageI } from "../../types";
import { Message } from "../../containers";
import "./Messages.scss";

interface Props {
	messages: MessageI[];
	isDisabled?: boolean;
}

const Messages: React.FC<Props> = ({ messages, isDisabled }) => {
	const [currentDay, setCurrentDay] = useState<number>(0);
	const [currentMonth, setCurrentMonth] = useState<number>(0);
	const [currentYear, setCurrentYear] = useState<number>(0);

	return (
		<div className="messages">
			{messages.map((message, i) => {
				const prevMessage = i > 0 ? messages[i - 1] : undefined;
				const nextMessage = i < messages.length ? messages[i + 1] : undefined;
				const spacer = new Date(message.created).getDay() > currentDay;
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
