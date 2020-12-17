import React from "react";
import "./Input.scss";

import { Button } from "../../components";

interface Props {}

const Input: React.FC<Props> = () => {
	return (
		<div className="input">
			<input type="text" placeholder="Type here..." />
			<Button>Send</Button>
		</div>
	);
};

export default Input;
