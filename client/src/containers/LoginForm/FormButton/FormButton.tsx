import React from "react";
import "./FormButton.scss";

import { CgSpinner } from "react-icons/cg";

interface Props {
	loading?: boolean;
	children: any;
}

const FormButton: React.FC<Props> = ({ loading, children }) => {
	return (
		<button className="FormButton" disabled={loading}>
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

export default FormButton;
