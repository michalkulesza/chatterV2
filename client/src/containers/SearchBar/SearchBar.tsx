import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducers/rootReducer";
import { clearUnreadMessages } from "../../redux/actions/user";
import { joinPrivate, switchRooms } from "../../redux/actions/room";
import { userRoomI } from "../../redux/types/user";
import { UserI } from "../../types";

import { User, Room } from "../../components";

import { FiSearch } from "react-icons/fi";
import "./SearchBar.scss";

interface Props {}

const SearchBar: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const { userList } = useSelector((state: RootState) => state.misc);
	const { userRooms, username } = useSelector((state: RootState) => state.user);

	const [usersFiltered, setUsersFiltered] = useState<UserI[]>([]);
	const [chatsFiltered, setChatsFiltered] = useState<userRoomI[]>([]);

	const [visible, setVisible] = useState(false);
	const [inputActive, setInputActive] = useState(false);
	const [inputValue, setInputValue] = useState("");

	const clearFilterResults = () => {
		setUsersFiltered([]);
		setChatsFiltered([]);
	};

	const handleClickOutside = () => {
		setVisible(false);
		setInputValue("");
		clearFilterResults();
	};
	const handleInputBlur = () => setInputActive(false);
	const handleInputClick = () => {
		setVisible(true);
		setInputActive(true);
	};

	const handleUserClick = (usersName: string, partnersName: string) => {
		console.log("CLICK");
		dispatch(joinPrivate([usersName, partnersName]));
		handleClickOutside();
	};
	const handleRoomClick = (room: string) => {
		dispatch(switchRooms(room));
		dispatch(clearUnreadMessages(room));
		handleClickOutside();
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value;
		setInputValue(query);

		if (query.length > 0) {
			let userResults = userList.filter(user => user.name.toLowerCase().startsWith(query.toLowerCase()));
			let chatResults = userRooms.filter(room => room._id.toLowerCase().startsWith(query.toLowerCase()));

			setUsersFiltered(userResults);
			setChatsFiltered(chatResults);
		} else {
			clearFilterResults();
		}
	};

	return (
		<OutsideClickHandler onOutsideClick={handleClickOutside}>
			<div className="searchBar">
				<div className="head">
					<FiSearch />
					<input
						type="text"
						placeholder={inputActive ? "" : "Search for anything"}
						onMouseDown={handleInputClick}
						onBlur={handleInputBlur}
						onChange={e => handleInputChange(e)}
						value={inputValue}
					/>
				</div>
				<div className={`body ${!visible ? "collapsed" : ""}`}>
					{(usersFiltered.length === 0 || chatsFiltered.length === 0) && (
						<div className="notice">There's nothing here</div>
					)}
					{username &&
						usersFiltered.map((user: UserI) => (
							<User
								currentUser={username}
								handler={handleUserClick}
								name={user.name}
								registered={user.registered}
								icon
								key={user.name}
							/>
						))}
					{chatsFiltered.map((room: userRoomI) => (
						<Room data={room} currentlyOnlineUsers={userList} handler={handleRoomClick} icon key={room._id} />
					))}
				</div>
			</div>
		</OutsideClickHandler>
	);
};

export default SearchBar;
