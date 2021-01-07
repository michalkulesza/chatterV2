import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

import { FiSearch } from "react-icons/fi";
import "./SearchBar.scss";

interface Props {}

const SearchBar: React.FC<Props> = () => {
	const [visible, setVisible] = useState(false);

	const handleInputClick = () => setVisible(true);
	const handleClickOutside = () => setVisible(false);

	return (
		<OutsideClickHandler onOutsideClick={handleClickOutside}>
			<div className="searchBar">
				<div className="head">
					<FiSearch />
					<input type="text" placeholder="Search for anything" onMouseDown={handleInputClick} />
				</div>
				<div className={`body ${!visible ? "collapsed" : ""}`}></div>
			</div>
		</OutsideClickHandler>
	);
};

export default SearchBar;
