import React from "react";
import "./User.scss";

import { Badge } from "../../components";
import { IoShieldCheckmarkSharp } from "react-icons/io5";

interface Props {
	currentUser: string;
	name: string;
	handler: any;
	registered: boolean;
}

const User: React.FC<Props> = ({ currentUser, name, handler, registered }) => {
	const handleUserClick = () => currentUser !== name && handler(currentUser, name);

	return (
		<div className="user" onMouseDown={handleUserClick}>
			{currentUser === name ? `${name} (You)` : name}
			<span>
				<div className="icon">
					<IoShieldCheckmarkSharp />
					<div className="label">Registered</div>
				</div>
				<Badge color="green">Online</Badge>
			</span>
		</div>
	);
};

export default User;
