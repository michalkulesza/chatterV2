import React, { useRef, useEffect } from "react";
import { useOnClickOutside } from "../../hooks";

import "./SearchBar.scss";
import { FiSearch } from "react-icons/fi";

interface Props {}

const SearchBar: React.FC<Props> = () => {
	const { ref, isComponentVisible } = useOnClickOutside(false);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isComponentVisible && inputRef.current) inputRef.current.focus();
	}, [isComponentVisible]);

	return (
		<div className="searchBar" ref={ref}>
			<div className="head">
				<FiSearch />
				<input type="text" placeholder="Search for anything" ref={inputRef} />
			</div>
			<div className={`body ${!isComponentVisible ? "collapsed" : ""}`} ref={ref}></div>
		</div>
	);
};

export default SearchBar;
