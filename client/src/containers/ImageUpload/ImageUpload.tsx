import React, { useState } from "react";
import { readAndCompressImage } from "browser-image-resizer";
import { useDispatch, useSelector } from "react-redux";
import "./ImageUpload.scss";

interface Props {}

import { Button } from "../../components";

import { IoCloseOutline, IoImageOutline } from "react-icons/io5";
import { addError, toggleImageUpload } from "../../redux/actions/ui";
import { setUploadedImage, uploadImage } from "../../redux/actions/user";
import { RootState } from "../../redux/reducers/rootReducer";
import { sendMessage } from "../../redux/actions/room";

const ImageUpload: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const { uploading, uploadedImage, username, profileImage } = useSelector((state: RootState) => state.user);
	const { _id: room } = useSelector((state: RootState) => state.room);

	const [textInput, setTextInput] = useState("");

	const handleCloseButton = () => {
		dispatch(setUploadedImage(null));
		setTextInput("");
		dispatch(toggleImageUpload());
	};
	const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setTextInput(e.target.value);
	const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const image = e.target.files[0];

			readAndCompressImage(image, { quality: 0.9, maxWidth: 1400, maxHeight: 1400 })
				.then((resizedImage: File) => dispatch(uploadImage(resizedImage)))
				.catch((err: Error) => dispatch(addError(err?.message)));
		}
	};

	const handleSendButton = () => {
		if (username && (textInput.length > 0 || uploadedImage)) {
			const message = {
				_id: new Date().toISOString(),
				author: {
					name: username,
					picture: profileImage,
				},
				created: new Date().toISOString(),
				room,
				content: textInput,
				reactions: {
					"+1": 0,
					heart: 0,
					rolling_on_the_floor_laughing: 0,
					slightly_frowning_face: 0,
				},
				image: uploadedImage,
			};

			dispatch(sendMessage(message));
			handleCloseButton();
		}
	};

	return (
		<div className="imageUploadContainer">
			<div className="imageUpload">
				<header>
					<Button type="square" color="transparent" svgSize="large" onMouseDown={handleCloseButton}>
						<IoCloseOutline />
					</Button>
				</header>
				<div className="preview">
					<div className="imagePlaceholder">
						{uploading ? (
							<>
								<div className="spinning">
									<IoImageOutline />
								</div>
								Uploading...
							</>
						) : (
							<>
								<IoImageOutline />
								No image
							</>
						)}
					</div>
					{uploadedImage && !uploading && <img src={uploadedImage} alt="" />}
				</div>
				<input
					type="file"
					className="inputFile"
					multiple={false}
					accept="image/png, image/jpeg"
					onChange={e => handleImageInputChange(e)}
				/>
				<input
					type="text"
					className="inputText"
					placeholder="Type here..."
					onChange={e => handleTextInputChange(e)}
					value={textInput}
				/>
				<div className="buttons">
					<Button color="defaultColor" onMouseDown={handleSendButton}>
						Send
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ImageUpload;
