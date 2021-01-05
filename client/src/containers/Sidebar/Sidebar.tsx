import React from "react";
import { useSelector } from "react-redux";
import "./Sidebar.scss";

import { SearchBar, List } from "../../containers";
import { RootState } from "../../redux/reducers/rootReducer";

interface Props {}

const Sidebar: React.FC<Props> = () => {
	const { sidebarVisible } = useSelector((state: RootState) => state.ui);
	const { userRooms } = useSelector((state: RootState) => state.user);
	const { userList } = useSelector((state: RootState) => state.misc);

	return (
		<div className={`sidebar ${!sidebarVisible && "collapsed"}`}>
			<SearchBar />
			<List type="users" usersData={userList} />
			<List type="rooms" roomsData={userRooms} />
		</div>
	);
};

export default Sidebar;
