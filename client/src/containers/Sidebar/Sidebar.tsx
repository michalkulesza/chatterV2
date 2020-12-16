import React from "react";
import { useSelector } from "react-redux";
import "./Sidebar.scss";

import { SearchBar, List } from "../../containers";
import { UserI, RoomI } from "../../types";
import { RootState } from "../../redux/reducers/rootReducer";

interface Props {}

const mockUsers: UserI[] = [
	{ _id: "1", name: "Tester" },
	{ _id: "2", name: "Weronix" },
	{ _id: "3", name: "Joahim" },
];
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

	return (
		<div className={`sidebar ${!visible && "collapsed"}`}>
			<SearchBar />
			<List type="users" usersData={mockUsers} />
			<List type="rooms" roomsData={mockRooms} />
		</div>
	);
};

export default Sidebar;
