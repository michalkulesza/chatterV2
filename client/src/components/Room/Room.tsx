import React from "react";
import "./Room.scss";

interface Props {
	name: string;
}

const Room: React.FC<Props> = ({ name }) => {
	return <div className="room">{name}</div>;
};

export default Room;
