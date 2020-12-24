import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Input.scss";

import { Button } from "../../components";
import { RootState } from "../../redux/reducers/rootReducer";
import { sendMessage } from "../../redux/actions/room";

interface Props {}

const Input: React.FC<Props> = () => {
	const dispatch = useDispatch();

	const { username, profileImage } = useSelector((state: RootState) => state.user);
	const { _id: room, locked } = useSelector((state: RootState) => state.room);
	const [input, setInput] = useState("");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

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
			};

			dispatch(sendMessage(message));
		}
		setInput("");
	};

	return (
		<form className="input" onSubmit={e => handleSubmit(e)}>
			<input
				type="text"
				placeholder={locked ? "Messages are disabled" : "Type here..."}
				value={input}
				disabled={locked}
				onChange={e => handleInputChange(e)}
			/>
			<Button>Send</Button>
		</form>
	);
};

export default Input;
