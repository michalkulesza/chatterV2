import React from "react";
import "./Button.scss";

import { CgSpinner } from "react-icons/cg";

interface Props {
	children: any;
	loading?: boolean;
	type?: "square" | "rectangle";
	color?: "defaultColor" | "transparent" | "gray";
	svgSize?: "large";
	onMouseDown?: () => void;
}

const Button: React.FC<Props> = ({
	children,
	loading,
	type = "rectangle",
	color = "defaultColor",
	svgSize,
	onMouseDown,
}) => {
	return (
		<button className={`button ${type} ${color} ${svgSize}`} disabled={loading} onMouseDown={onMouseDown}>
			{loading === true ? (
				<span>
					<CgSpinner />
				</span>
			) : (
				children
			)}
		</button>
	);
};

export default Button;
