import React, { useState, useEffect } from "react";
import { setMessageAsDeleted } from "../../redux/actions/room";
import { useDispatch, useSelector } from "react-redux";
import { MessageI } from "../../types";
import Moment from "react-moment";

import "./Message.scss";
import { RootState } from "../../redux/reducers/rootReducer";

interface Props {
	currentUser: string;
	message: MessageI;
	prevMessage?: MessageI;
}

const Message: React.FC<Props> = ({ currentUser, message, prevMessage }) => {
	let timer: NodeJS.Timeout;
	const dispatch = useDispatch();
	const currentRoom = useSelector((state: RootState) => state.room._id);
	const [collapsed, setCollapsed] = useState(true);
	const [mouseOverExtras, setMouseOverExtras] = useState(false);
	const [deleteConfirmation, setDeleteConfirmation] = useState(false);

	const fromMyself = currentUser === message.author;
	const fromAdmin = message.author === "admin";
	const fromPartner = currentUser !== message.author && !fromAdmin;
	const authorClass = `${fromMyself && "fromMyself"} ${fromAdmin && "fromAdmin"} ${fromPartner && "fromPartner"}`;

	const fromTheSameUser = prevMessage && prevMessage.author === message.author;
	const messageDeleted = message.deleted;

	const handleMessageClick = () => setCollapsed(!collapsed);
	const handleMouseEnter = () => setMouseOverExtras(true);
	const handleMouseLeave = () => setMouseOverExtras(false);
	const handleDeleteClick = () => setDeleteConfirmation(true);
	const handleDeleteConfirm = () => currentRoom && dispatch(setMessageAsDeleted(currentRoom, message._id));

	useEffect(() => {
		if (!collapsed && !mouseOverExtras) timer = setTimeout(() => setCollapsed(true), 2500);
		return () => {
			clearTimeout(timer);
			setDeleteConfirmation(false);
		};
	}, [collapsed, mouseOverExtras]);

	return (
		<div className={`messageContainer ${authorClass}`}>
			<div className={`messageWrapper ${authorClass} ${fromMyself && "withButton"}`}>
				{fromPartner && !fromTheSameUser && <span>{message.author}</span>}
				<div className={`message ${messageDeleted && "deleted"}`} onMouseDown={handleMessageClick}>
					{!messageDeleted && message.content}
					{messageDeleted && `Message deleted...`}
				</div>
				{!fromAdmin && !messageDeleted && (
					<div
						className={`extrasContainer ${collapsed && "collapsed"}`}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						<Moment fromNow interval={10000}>
							{message.created}
						</Moment>
						{!fromAdmin && !fromPartner && (
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
				)}
			</div>
		</div>
	);
};

export default Message;
