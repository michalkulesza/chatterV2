import React from "react";
import "./User.scss";

import { Badge } from "../../components";

interface Props {
	name: string;
}

const User: React.FC<Props> = ({ name }) => {
	return (
		<div className="user">
			{name}
			<Badge color="green">Online</Badge>
		</div>
	);
};

export default User;
