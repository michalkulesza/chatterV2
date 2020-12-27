import React, { useState, useEffect } from "react";
import { addReaction, deleteMessage } from "../../redux/actions/room";
import { RootState } from "../../redux/reducers/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { MessageI } from "../../types";
import { Emoji } from "emoji-mart";
import Moment from "react-moment";

import "./Message.scss";

interface Props {
	message: MessageI;
	prevMessage?: MessageI;
	deleteDisabled?: boolean;
	marginBottom?: boolean;
}

const initReactions = {
	"+1": 0,
	heart: 0,
	rolling_on_the_floor_laughing: 0,
	slightly_frowning_face: 0,
};

const Message: React.FC<Props> = ({ message, prevMessage, deleteDisabled = false, marginBottom }) => {
	let timer: NodeJS.Timeout;

	const dispatch = useDispatch();
	const currentUser = useSelector((state: RootState) => state.user.username);
	const currentRoom = useSelector((state: RootState) => state.room._id);

	const [deleteConfirmation, setDeleteConfirmation] = useState(false);
	const [mouseOverExtras, setMouseOverExtras] = useState(false);
	const [messageHovered, setMessageHovered] = useState(false);
	const [collapsed, setCollapsed] = useState(true);

	const fromMyself = currentUser === message.author.name;
	const fromAdmin = message.author.name === "admin";
	const fromPartner = currentUser !== message.author.name && !fromAdmin;
	const authorClass = `${fromMyself && "fromMyself"} ${fromAdmin && "fromAdmin"} ${fromPartner && "fromPartner"}`;

	const fromTheSameUser = prevMessage && prevMessage.author.name === message.author.name;
	const combinedReactions = { ...initReactions, ...message.reactions };
	const messageDeleted = message.deleted;
	const thereIsReaction = Object.values(combinedReactions).filter(num => num > 0).length > 0;
	const reactionsFullyVisible = messageHovered;
	const reactionsCompactVisible = thereIsReaction && !reactionsFullyVisible;

	const handleMessageClick = () => setCollapsed(!collapsed);
	const handleMouseEnter = () => setMouseOverExtras(true);
	const handleMouseLeave = () => setMouseOverExtras(false);
	const handleDeleteClick = () => setDeleteConfirmation(true);
	const handleDeleteConfirm = () => currentRoom && dispatch(deleteMessage(currentRoom, message._id));
	const handleMessageHoverIn = () => setMessageHovered(true);
	const handleMessageHoverOut = () => setMessageHovered(false);
	const handleReactionClick = (reaction: string) =>
		currentRoom && currentUser && dispatch(addReaction(currentUser, currentRoom, message._id, reaction));

	useEffect(() => {
		if (!collapsed && !mouseOverExtras) timer = setTimeout(() => setCollapsed(true), 2500);

		return () => {
			clearTimeout(timer);
			setDeleteConfirmation(false);
		};
	}, [collapsed, mouseOverExtras]);

	return (
		<div className={`messageContainer ${authorClass} ${marginBottom && "marginBottom"}`}>
			{fromPartner && (
				<div className="profilePicture">
					{!fromTheSameUser && <img src={message.author.picture} className="picture"></img>}
				</div>
			)}
			<div
				className={`messageWrapper ${authorClass} ${fromMyself && "withButton"}`}
				onMouseEnter={handleMessageHoverIn}
				onMouseLeave={handleMessageHoverOut}
			>
				{fromPartner && !fromTheSameUser && <span>{message.author.name}</span>}
				<div className={`message ${messageDeleted && "deleted"}`} onMouseDown={handleMessageClick}>
					{!messageDeleted && message.content}
					{messageDeleted && `Message deleted...`}
				</div>
				{!fromAdmin && !messageDeleted && (
					<>
						<div
							className={`reactions ${fromPartner && "left"} ${
								(reactionsCompactVisible || reactionsFullyVisible) && "visible"
							}`}
						>
							{Object.entries(combinedReactions).map(reaction => (
								<div
									className={`reaction ${reaction[1] > 0 && !reactionsFullyVisible && "compact"} ${
										reactionsFullyVisible && "visible"
									} ${fromPartner && "left"}`}
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
						<div
							className={`extrasContainer ${collapsed && "collapsed"}`}
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
						>
							<Moment fromNow interval={10000}>
								{message.created}
							</Moment>
							{!fromAdmin && !fromPartner && !deleteDisabled && (
								<div className="deleteContainer">
									{deleteConfirmation ? (
										<button className="green" onMouseDown={handleDeleteConfirm}>
											Confirm
										</button>
									) : (
										<button className="red" onMouseDown={handleDeleteClick}>
											Delete
										</button>
									)}
								</div>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Message;
