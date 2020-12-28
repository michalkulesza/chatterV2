import React from "react";
import { Emoji } from "emoji-mart";
import { UsersMessageReactionsI } from "../../../types";
import "./Reaction.scss";

interface Props {
	reactionsFullyVisible: boolean;
	fromPartner: boolean;
	reactionFromMyself: UsersMessageReactionsI | undefined;
	reactionName: string;
	reactionCount: number;
	handleReactionClick: (reaction: string) => void;
}

const Reaction: React.FC<Props> = ({
	reactionsFullyVisible,
	fromPartner,
	reactionFromMyself,
	reactionName,
	reactionCount,
	handleReactionClick,
}) => {
	return (
		<div
			className={`reaction ${reactionCount > 0 && !reactionsFullyVisible && "compact"} ${
				reactionsFullyVisible && "visible"
			} ${fromPartner && "left"} ${
				reactionFromMyself && reactionFromMyself.reaction === reactionName && "highlighted"
			}`}
			onMouseDown={() => handleReactionClick(reactionName)}
			key={reactionName}
		>
			<div className="icon">
				<Emoji emoji={reactionName} size={16}></Emoji>
			</div>
			<div className="number">{reactionCount}</div>
		</div>
	);
};

export default Reaction;
