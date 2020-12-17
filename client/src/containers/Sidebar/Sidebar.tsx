import React from "react";
import { useSelector } from "react-redux";
import "./Sidebar.scss";

import { SearchBar, List } from "../../containers";
import { RoomI } from "../../types";
import { RootState } from "../../redux/reducers/rootReducer";

interface Props {}

const mockRooms: RoomI[] = [
	{ name: "Main", type: "room" },
	{
		name: "Weronix",
		type: "private",
		users: [
			{ _id: "1", name: "Weronix" },
			{
				_id: "2",
				name: "Michal",
			},
		],
	},
	{
		name: "Joahim",
		type: "private",
		users: [
			{
				_id: "3",
				name: "Joahim",
			},
			{
				_id: "4",
				name: "Michal",
			},
		],
	},
];

const Sidebar: React.FC<Props> = () => {
	const visible = useSelector((state: RootState) => state.ui.sidebarVisible);
	const userList = useSelector((state: RootState) => state.misc.userList);

	return (
		<div className={`sidebar ${!visible && "collapsed"}`}>
			<SearchBar />
			<List type="users" usersData={userList} />
			<List type="rooms" roomsData={mockRooms} />
		</div>
	);
};

export default Sidebar;
