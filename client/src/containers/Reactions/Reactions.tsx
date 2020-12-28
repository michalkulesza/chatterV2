import React from "react";
import { RootState } from "../../redux/reducers/rootReducer";
import socket from "../../config/socketio";
import { useSelector } from "react-redux";
import { MessageI } from "../../types";
import { Emoji } from "emoji-mart";
import "./Reactions.scss";

interface Props {
	fromPartner: boolean;
	message: MessageI;
	messageHovered: boolean;
}

const initReactions = {
	"+1": 0,
	heart: 0,
	rolling_on_the_floor_laughing: 0,
	slightly_frowning_face: 0,
};

const Reactions: React.FC<Props> = ({ fromPartner, message, messageHovered }) => {
	const { username: currentUser, reactions: userReactions } = useSelector((state: RootState) => state.user);
	const currentRoom = useSelector((state: RootState) => state.room._id);

	const combinedReactions = { ...initReactions, ...message.reactions };
	const thereIsReaction = Object.values(combinedReactions).filter(num => num > 0).length > 0;
	const reactionsFullyVisible = messageHovered;
	const reactionsCompactVisible = thereIsReaction && !reactionsFullyVisible;
	const reactionFromMyself = userReactions.find(reaction => {
		if (reaction.messageID === message._id) return reaction.reaction;
	});

	const handleReactionClick = (reaction: string) => {
		const userReaction = userReactions.find(reaction => reaction.messageID === message._id);

		if (userReaction) {
			if (userReaction.reaction === reaction) {
				socket.emit("removeReaction", { username: currentUser, room: currentRoom, messageID: message._id, reaction });
			} else {
				socket.emit("changeReaction", {
					username: currentUser,
					room: currentRoom,
					messageID: message._id,
					reactionFrom: userReaction.reaction,
					reactionTo: reaction,
				});
			}
		} else {
			if (currentRoom && currentUser)
				socket.emit("addReaction", { username: currentUser, room: currentRoom, messageID: message._id, reaction });
		}
	};

	return (
		<div
			className={`reactions ${fromPartner && "left"} ${
				(reactionsCompactVisible || reactionsFullyVisible) && "visible"
			}`}
		>
			{Object.entries(combinedReactions).map(reaction => (
				<div
					className={`reaction ${reaction[1] > 0 && !reactionsFullyVisible && "compact"} ${
						reactionsFullyVisible && "visible"
					} ${fromPartner && "left"} ${
						reactionFromMyself && reactionFromMyself.reaction === reaction[0] && "highlighted"
					}`}
					onMouseDown={() => handleReactionClick(reaction[0])}
					key={reaction[0]}
				>
					<div className="icon">
						<Emoji emoji={reaction[0]} size={16}></Emoji>
					</div>
					<div className="number">{reaction[1]}</div>
				</div>
			))}
		</div>
	);
};

export default Reactions;
