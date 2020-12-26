import React from "react";
import {
	setAvatarSelected,
	setProfileImage,
	updateProfileImage,
	uploadProfileImage,
} from "../../../redux/actions/user";
import { RootState } from "../../../redux/reducers/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { readAndCompressImage } from "browser-image-resizer";

import AvatarPreview from "./AvatarPreview/AvatarPreview";
import { Button } from "../../../components";

import { Default1, Default2, Default3 } from "../../../constants/defaultProfilePictures";
import "./AvatarSelection.scss";
import { addError } from "../../../redux/actions/ui";

interface Props {
	hidden: boolean;
	password: string;
}

const AvatarSelection: React.FC<Props> = ({ hidden, password }) => {
	const dispatch = useDispatch();
	const { profileImage, uploadedImage, uploading, username } = useSelector((state: RootState) => state.user);
	const { error } = useSelector((state: RootState) => state.ui);

	const handleImageClick = (url: string) => dispatch(setProfileImage(url));
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const image = e.target.files[0];

			readAndCompressImage(image, { quality: 0.9, maxWidth: 300, maxHeight: 300 })
				.then((resizedImage: File) => dispatch(uploadProfileImage(resizedImage)))
				.catch((err: Error) => dispatch(addError(err?.message)));
		}
	};

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
						{uploading || uploadedImage ? (
							<div className="reservedSpace">
								{uploading && (
									<div className="uploadStatus">
										<div className="outline" />
										<div className="text">Uploading</div>
									</div>
								)}
								{uploadedImage && !uploading && <AvatarPreview handler={handleImageClick} imgUrl={uploadedImage} />}
							</div>
						) : null}

						<AvatarPreview imgUrl={Default1} handler={handleImageClick} />
						<AvatarPreview imgUrl={Default2} handler={handleImageClick} />
						<AvatarPreview imgUrl={Default3} handler={handleImageClick} />
					</div>
				</div>
				<div className="upload">
					<input type="file" accept="image/png, image/jpeg" onChange={e => handleInputChange(e)} multiple={false} />
				</div>
				<div className="error">{error}</div>
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
