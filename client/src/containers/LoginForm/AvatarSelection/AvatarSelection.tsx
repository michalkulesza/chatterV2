import React from "react";
import {
	setAvatarSelected,
	setProfileImage,
	updateProfileImage,
	uploadProfileImage,
} from "../../../redux/actions/auth";
import { RootState } from "../../../redux/reducers/rootReducer";
import { useDispatch, useSelector } from "react-redux";

import AvatarPreview from "./AvatarPreview/AvatarPreview";
import { Button } from "../../../components";

import { Default1, Default2, Default3 } from "../../../constants/defaultProfilePictures";
import "./AvatarSelection.scss";

interface Props {
	hidden: boolean;
	password: string;
}

const AvatarSelection: React.FC<Props> = ({ hidden, password }) => {
	const dispatch = useDispatch();
	const { profileImage, uploadedImage, uploading, username } = useSelector((state: RootState) => state.user);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		e.target.files && dispatch(uploadProfileImage(e.target.files[0]));
	const handleImageClick = (url: string) => dispatch(setProfileImage(url));

	const handleSkipClick = () => dispatch(setAvatarSelected(true));
	const handleConfirmClick = () => {
		if (uploadedImage && username) {
			dispatch(updateProfileImage(uploadedImage, username, password));
			dispatch(setAvatarSelected(true));
		}
	};

	return (
		<div className={`avatarSelection ${hidden && "hidden"}`}>
			<div className="main">
				<div className="preview">
					<img src={profileImage} className="preview" alt="current profile image" draggable={false}></img>
				</div>
				<div className="title">Profile picture</div>
				<div className="carouselContainer">
					<div className="carousel">
						{uploading && (
							<div className="uploadStatus">
								<div className="outline" />
								<div className="text">Uploading</div>
							</div>
						)}
						{uploadedImage && !uploading && <AvatarPreview handler={handleImageClick} imgUrl={uploadedImage} />}

						<AvatarPreview imgUrl={Default1} handler={handleImageClick} />
						<AvatarPreview imgUrl={Default2} handler={handleImageClick} />
						<AvatarPreview imgUrl={Default3} handler={handleImageClick} />
					</div>
				</div>
				<div className="upload">
					<input type="file" accept="image/png, image/jpeg" onChange={e => handleInputChange(e)} multiple={false} />
				</div>
			</div>
			<div className="buttons">
				<Button color="gray" onMouseDown={handleSkipClick}>
					Skip
				</Button>
				<Button onMouseDown={handleConfirmClick}>Confirm</Button>
			</div>
		</div>
	);
};

export default AvatarSelection;
