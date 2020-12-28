import React from "react";
import { RootState } from "../../redux/reducers/rootReducer";
import { useSelector } from "react-redux";

import { ChatContainer, Sidebar, ImageUpload, ImagePreview } from "../../containers";
import { Overlay } from "../../components";

import { CgSpinner } from "react-icons/cg";
import "./Chat.scss";

interface Props {}

const Chat: React.FC<Props> = () => {
	const { loading, imageUpload, imagePreview } = useSelector((state: RootState) => state.ui);

	return (
		<div className="chat">
			{loading === true && (
				<Overlay>
					<div className="spinning">
						<CgSpinner />
					</div>
					<span>Getting things ready...</span>
				</Overlay>
			)}
			<Sidebar />
			<ChatContainer />
			{imageUpload && (
				<Overlay>
					<ImageUpload />
				</Overlay>
			)}
			{imagePreview && (
				<Overlay>
					<ImagePreview />
				</Overlay>
			)}
		</div>
	);
};

export default Chat;
