import React from "react";
import "./Button.scss";

import { CgSpinner } from "react-icons/cg";

interface Props {
	loading?: boolean;
	children: any;
}

const Button: React.FC<Props> = ({ loading, children }) => {
	return (
		<button className="Button" disabled={loading}>
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
