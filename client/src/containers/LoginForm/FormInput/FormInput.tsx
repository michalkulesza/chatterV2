import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import "./FormInput.scss";

interface Props {
	setState: React.Dispatch<React.SetStateAction<any>>;
	state: any;
	label: string;
	labelColor?: "gray" | "white";
	disabled?: boolean;
	type?: "text" | "password" | "checkbox";
	required?: boolean;
	autoFocus?: boolean;
}

const FormInput: React.FC<Props> = ({
	setState,
	state,
	label,
	labelColor = "gray",
	disabled,
	type = "text",
	required = false,
	autoFocus,
}) => {
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
				autoFocus={autoFocus}
			/>
			<label htmlFor={ID} className={`${labelOnTop && type !== "checkbox" && "onTop"} ${labelColor}`}>
				{label}
			</label>
		</div>
	);
};

export default FormInput;
