import React from "react";
import "./Overlay.scss";

interface Props {}

const Overlay: React.FC<Props> = ({ children }) => {
	return <div className="overlay">{children}</div>;
};

export default Overlay;
