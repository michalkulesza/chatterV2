import React from "react";

import { FiUsers } from "react-icons/fi";
import { RiChat1Line } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import "./Header.scss";

interface Props {
	type: "users" | "rooms";
	collapsed: boolean;
	handleCollapse: () => void;
}

const Header: React.FC<Props> = ({ type, collapsed, handleCollapse }) => {
	return (
		<header onMouseDown={handleCollapse}>
			<h4 className="title">
				<div className="icon">{type === "users" ? <FiUsers /> : <RiChat1Line />}</div>
				{type === "users" ? "Users" : "Conversations"}
			</h4>
			<button className={`collapseButton ${collapsed && "active"}`}>
				<BiChevronDown />
			</button>
		</header>
	);
};

export default Header;
