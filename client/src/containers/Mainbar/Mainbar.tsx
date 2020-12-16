import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/actions/ui";
import { RootState } from "../../redux/reducers/rootReducer";

import { Button } from "../../components";

import { IoCloseOutline } from "react-icons/io5";
import { BiMenuAltLeft } from "react-icons/bi";
import "./Mainbar.scss";

interface Props {}

const Mainbar: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const sidebarVisible = useSelector((state: RootState) => state.ui.sidebarVisible);

	const handleButtonClick = () => dispatch(toggleSidebar());

	return (
		<header className="mainbar">
			<Button color="transparent" type="square" svgSize="large" onMouseDown={handleButtonClick}>
				{sidebarVisible ? <IoCloseOutline /> : <BiMenuAltLeft />}
			</Button>
		</header>
	);
};

export default Mainbar;
