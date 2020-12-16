import React from "react";
import "./Badge.scss";

interface Props {
	children: any;
	color?: "gray" | "green";
}

const Badge: React.FC<Props> = ({ children, color = "gray" }) => {
	return <div className={`badge ${color}`}>{children}</div>;
};

export default Badge;
