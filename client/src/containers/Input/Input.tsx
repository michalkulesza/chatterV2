import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch, useSelector } from "react-redux";
import { EmojiData, Picker } from "emoji-mart";

import { RootState } from "../../redux/reducers/rootReducer";
import { toggleEmojiPicker } from "../../redux/actions/ui";
import { sendMessage } from "../../redux/actions/room";
import { Button } from "../../components";

import { VscSmiley } from "react-icons/vsc";
import "emoji-mart/css/emoji-mart.css";
import "./Input.scss";

interface Props {}

const Input: React.FC<Props> = () => {
	const dispatch = useDispatch();

	const { username, profileImage } = useSelector((state: RootState) => state.user);
	const { _id: room, locked } = useSelector((state: RootState) => state.room);
	const { emojiPicker } = useSelector((state: RootState) => state.ui);
	const [input, setInput] = useState("");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);
	const handleEmojiPickerClick = () => dispatch(toggleEmojiPicker());
	const handleEmojiPickerClickOutside = () => emojiPicker && dispatch(toggleEmojiPicker());
	const handleEmojiClick = (e: EmojiData) => {
		const emoji = e.native;
		setInput(`${input}${emoji}`);
	};
	const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleSubmit();
	const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
		e?.preventDefault();
		const messageContent = input.trim();
		const messageIsEmpty = messageContent === "";

		if (username && room && !locked && !messageIsEmpty) {
			const message = {
				_id: new Date().toISOString(),
				author: {
					name: username,
					picture: profileImage,
				},
				created: new Date().toISOString(),
				room,
				content: input,
				reactions: {
					"+1": 0,
					heart: 0,
					rolling_on_the_floor_laughing: 0,
					slightly_frowning_face: 0,
				},
				image: null,
			};

			dispatch(sendMessage(message));
		}
		setInput("");
	};

	return (
		<form className="input" onSubmit={e => handleSubmit(e)}>
			<div className="inputWrapper">
				<OutsideClickHandler onOutsideClick={handleEmojiPickerClickOutside}>
					<div className={`emojiPicker ${emojiPicker && "visible"}`}>
						<Picker
							showPreview={false}
							showSkinTones={false}
							native={true}
							emojiSize={20}
							onSelect={e => handleEmojiClick(e)}
						/>
					</div>
					<div className="tools">
						<div className={`emojiPickerButton ${emojiPicker && "active"}`} onMouseDown={handleEmojiPickerClick}>
							<VscSmiley />
						</div>
					</div>
				</OutsideClickHandler>
				<input
					type="text"
					placeholder={locked ? "Messages are disabled" : "Type here..."}
					value={input}
					disabled={locked}
					onChange={e => handleInputChange(e)}
					autoComplete="off"
					onKeyDown={e => handleInputKeyDown(e)}
				/>
				<Button>Send</Button>
			</div>
		</form>
	);
};

export default Input;
