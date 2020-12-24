import React, { useState, useEffect } from "react";
import { RootState } from "../../redux/reducers/rootReducer";
import { deleteMessage } from "../../redux/actions/room";
import { useDispatch, useSelector } from "react-redux";
import { MessageI } from "../../types";
import Moment from "react-moment";

import "./Message.scss";

interface Props {
	message: MessageI;
	prevMessage?: MessageI;
	deleteDisabled?: boolean;
	marginBottom?: boolean;
}

const Message: React.FC<Props> = ({ message, prevMessage, deleteDisabled = false, marginBottom }) => {
	let timer: NodeJS.Timeout;

	const dispatch = useDispatch();
	const currentUser = useSelector((state: RootState) => state.auth.username);
	const currentRoom = useSelector((state: RootState) => state.room._id);

	const [deleteConfirmation, setDeleteConfirmation] = useState(false);
	const [mouseOverExtras, setMouseOverExtras] = useState(false);
	const [collapsed, setCollapsed] = useState(true);

	const fromMyself = currentUser === message.author.name;
	const fromAdmin = message.author.name === "admin";
	const fromPartner = currentUser !== message.author.name && !fromAdmin;
	const authorClass = `${fromMyself && "fromMyself"} ${fromAdmin && "fromAdmin"} ${fromPartner && "fromPartner"}`;

	const fromTheSameUser = prevMessage && prevMessage.author.name === message.author.name;
	const messageDeleted = message.deleted;

	const handleMessageClick = () => setCollapsed(!collapsed);
	const handleMouseEnter = () => setMouseOverExtras(true);
	const handleMouseLeave = () => setMouseOverExtras(false);
	const handleDeleteClick = () => setDeleteConfirmation(true);
	const handleDeleteConfirm = () => currentRoom && dispatch(deleteMessage(currentRoom, message._id));

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
			<div className={`messageWrapper ${authorClass} ${fromMyself && "withButton"}`}>
				{fromPartner && !fromTheSameUser && <span>{message.author.name}</span>}
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
				)}
			</div>
		</div>
	);
};

export default Message;
