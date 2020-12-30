import React, { useState, useEffect } from "react";
import { RootState } from "../../redux/reducers/rootReducer";
import { deleteMessage } from "../../redux/actions/room";
import { useDispatch, useSelector } from "react-redux";
import { MessageI } from "../../types";
import { key } from "../../config/key";
import Moment from "react-moment";

import { Reactions } from "../../containers";
import "./Message.scss";
import { setImagePreview } from "../../redux/actions/ui";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Gif } from "@giphy/react-components";

interface Props {
	message: MessageI;
	prevMessage?: MessageI;
	deleteDisabled?: boolean;
	marginBottom?: boolean;
}

const Message: React.FC<Props> = ({ message, prevMessage, deleteDisabled = false, marginBottom }) => {
	let messageHoverTimer: NodeJS.Timeout;
	let timer: NodeJS.Timeout;

	const dispatch = useDispatch();
	const { username: currentUser } = useSelector((state: RootState) => state.user);
	const currentRoom = useSelector((state: RootState) => state.room._id);

	const [messageHoverTrigger, setMessageHoverTrigger] = useState(false);
	const [deleteConfirmation, setDeleteConfirmation] = useState(false);
	const [mouseOverExtras, setMouseOverExtras] = useState(false);
	const [messageHovered, setMessageHovered] = useState(false);
	const [collapsed, setCollapsed] = useState(true);
	const [gif, setGif] = useState<any>(null);

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
	const handleMessageHoverIn = () => setMessageHoverTrigger(true);
	const handleMessageHoverOut = () => setMessageHoverTrigger(false);
	const handleImageClick = () => message.image && dispatch(setImagePreview(message.image));

	useEffect(() => {
		if (!collapsed && !mouseOverExtras) timer = setTimeout(() => setCollapsed(true), 2500);

		return () => {
			clearTimeout(timer);
			setDeleteConfirmation(false);
		};
	}, [collapsed, mouseOverExtras]);

	useEffect(() => {
		if (messageHoverTrigger) messageHoverTimer = setTimeout(() => setMessageHovered(true), 500);

		return () => {
			clearTimeout(messageHoverTimer);
			setMessageHovered(false);
		};
	}, [messageHoverTrigger]);

	useEffect(() => {
		if (message.giphyID) {
			const gf = new GiphyFetch(key);
			const getGif = async (gifID: any) => {
				const { data } = await gf.gif(gifID);
				setGif(data);
			};

			getGif(message.giphyID);
		}
	}, [message.giphyID]);

	return (
		<div className={`messageContainer ${authorClass} ${marginBottom && "marginBottom"}`}>
			{fromPartner && (
				<div className="profilePicture">
					{!fromTheSameUser && <img src={message.author.picture} className="picture" draggable={false}></img>}
				</div>
			)}
			<div
				className={`messageWrapper ${authorClass} ${fromMyself && "withButton"}`}
				onMouseEnter={handleMessageHoverIn}
				onMouseLeave={handleMessageHoverOut}
			>
				{fromPartner && !fromTheSameUser && <span>{message.author.name}</span>}
				<div className={`message ${messageDeleted && "deleted"}`} onMouseDown={handleMessageClick}>
					{gif && !messageDeleted && <Gif gif={gif} width={300} noLink></Gif>}
					{message.image && !messageDeleted && (
						<div className="imageContainer" onMouseDown={handleImageClick}>
							<img src={message.image} alt="" />
						</div>
					)}
					{!messageDeleted && message.content.length > 0 && message.content}
					{messageDeleted && `Message deleted...`}
				</div>
				{!fromAdmin && !messageDeleted && (
					<>
						<Reactions fromPartner={fromPartner} message={message} messageHovered={messageHovered} />
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
