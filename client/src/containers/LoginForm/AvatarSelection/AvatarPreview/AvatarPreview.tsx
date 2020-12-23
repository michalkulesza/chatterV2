import React from "react";
import "./AvatarPreview.scss";

interface Props {
	handler: (url: string) => void;
	imgUrl: string;
}

const AvatarPreview: React.FC<Props> = ({ handler, imgUrl }) => {
	const handleClick = () => {
		handler(imgUrl);
	};

	return (
		<div className="avatarPreview" onMouseDown={handleClick}>
			<img src={imgUrl} alt="Avatar" draggable={false} />
		</div>
	);
};

export default AvatarPreview;
