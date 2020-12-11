import React from "react";
import "./FormButton.scss";

interface Props {
	children: any;
}

const FormButton: React.FC<Props> = ({ children }) => {
	return <button className="FormButton">{children}</button>;
};

export default FormButton;
