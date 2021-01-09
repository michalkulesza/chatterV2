import React from "react";
import "./User.scss";

import { Badge } from "../../components";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { FiUser } from "react-icons/fi";

interface Props {
	currentUser: string;
	name: string;
	handler: any;
	registered: boolean;
	icon?: boolean;
}

const User: React.FC<Props> = ({ currentUser, name, handler, registered, icon }) => {
	const handleUserClick = () => currentUser !== name && handler(currentUser, name);

	return (
		<div className="user" onMouseDown={handleUserClick}>
			<div className="left">
				{icon && (
					<div className="icon">
						<FiUser />
					</div>
				)}
				{currentUser === name ? `${name} (You)` : name}
			</div>
			<div className="right">
				{registered && (
					<div className="icon">
						<IoShieldCheckmarkSharp />
						<div className="label">Registered</div>
					</div>
				)}
				<Badge color="green">Online</Badge>
			</div>
		</div>
	);
};

export default User;
