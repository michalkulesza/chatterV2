import React from "react";
import { useSelector } from "react-redux";
import "./Sidebar.scss";

import { SearchBar, List } from "../../containers";
import { RootState } from "../../redux/reducers/rootReducer";

interface Props {}

const Sidebar: React.FC<Props> = () => {
	const visible = useSelector((state: RootState) => state.ui.sidebarVisible);
	const userList = useSelector((state: RootState) => state.misc.userList);
	const roomsList = useSelector((state: RootState) => state.user.userRooms);

	return (
		<div className={`sidebar ${!visible && "collapsed"}`}>
			<SearchBar />
			<List type="users" usersData={userList} />
			<List type="rooms" roomsData={roomsList} />
		</div>
	);
};

export default Sidebar;
