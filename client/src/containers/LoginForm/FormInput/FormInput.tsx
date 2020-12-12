import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import "./FormInput.scss";

interface Props {
	setState: React.Dispatch<React.SetStateAction<any>>;
	state: any;
	label: string;
	disabled?: boolean;
	type?: "text" | "password" | "checkbox";
	required?: boolean;
}

const FormInput: React.FC<Props> = ({ setState, state, label, disabled, type = "text", required = false }) => {
	const ID = uuid();
	const [active, setActive] = useState(false);
	const [labelOnTop, setLabelOnTop] = useState(false);

	useEffect(() => {
		active || state?.length > 0 ? setLabelOnTop(true) : setLabelOnTop(false);
	}, [active, state]);

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		type === "checkbox" ? setState(e.target.checked) : setState(e.target.value);

	const handleOnFocus = () => setActive(true);
	const handleOnBlur = () => setActive(false);

	return (
		<div className={`FormInput ${type === "checkbox" && "horizontal"}`}>
			<input
				id={ID}
				type={type}
				value={state}
				onChange={e => handleOnChange(e)}
				onFocus={handleOnFocus}
				onBlur={handleOnBlur}
				required={required}
				disabled={disabled}
			/>
			<label htmlFor={ID} className={labelOnTop && type !== "checkbox" ? "onTop" : ""}>
				{label}
			</label>
		</div>
	);
};

export default FormInput;
