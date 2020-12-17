import React from "react";
import "./Overlay.scss";

import { CgSpinner } from "react-icons/cg";

interface Props {}

const Overlay: React.FC<Props> = () => {
	return (
		<div className="overlay">
			<CgSpinner />
			<span>Getting things ready...</span>
		</div>
	);
};

export default Overlay;
