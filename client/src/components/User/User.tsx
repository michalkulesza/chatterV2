import React from "react";
import "./User.scss";

import { Badge } from "../../components";

interface Props {
	currentUser: string;
	name: string;
}

const User: React.FC<Props> = ({ currentUser, name }) => {
	return (
		<div className="user">
			{currentUser === name ? `${name} (You)` : name}
			<Badge color="green">Online</Badge>
		</div>
	);
};

export default User;
