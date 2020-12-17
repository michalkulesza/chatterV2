import React, { useState } from "react";
import "./Input.scss";

import { Button } from "../../components";

interface Props {}

const Input: React.FC<Props> = () => {
	const [input, setInput] = useState("");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

	return (
		<div className="input">
			<input type="text" placeholder="Type here..." value={input} onChange={e => handleInputChange(e)} />
			<Button>Send</Button>
		</div>
	);
};

export default Input;
