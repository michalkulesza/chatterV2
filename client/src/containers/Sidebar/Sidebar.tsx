import React, { useState } from "react";
import "./Sidebar.scss";

import { SearchBar } from "../../containers";

interface Props {}

const Sidebar: React.FC<Props> = () => {
	const [collapsed, setCollapsed] = useState(false);

	return (
		<div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
			<SearchBar />
		</div>
	);
};

export default Sidebar;
