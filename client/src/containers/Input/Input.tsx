import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Input.scss";

import { Button } from "../../components";
import { RootState } from "../../redux/reducers/rootReducer";
import { addMessage } from "../../redux/actions/room";

interface Props {}

const Input: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const [input, setInput] = useState("");
	const username = useSelector((state: RootState) => state.auth.username);
	const room = useSelector((state: RootState) => state.room._id);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (username && room) {
			const message = {
				author: username,
				created: new Date().toISOString(),
				room,
				content: input,
			};

			dispatch(addMessage(message));
		}

		setInput("");
	};

	return (
		<form className="input" onSubmit={e => handleSubmit(e)}>
			<input type="text" placeholder="Type here..." value={input} onChange={e => handleInputChange(e)} />
			<Button>Send</Button>
		</form>
	);
};

export default Input;
