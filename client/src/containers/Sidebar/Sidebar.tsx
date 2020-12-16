import React, { useState } from "react";
import "./Sidebar.scss";

interface Props {}

const Sidebar: React.FC<Props> = () => {
	const [collapsed, setCollapsed] = useState(false);

	return <div className={`sidebar ${collapsed ? "collapsed" : ""}`}></div>;
};

export default Sidebar;
