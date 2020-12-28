import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setImagePreview } from "../../redux/actions/ui";
import { RootState } from "../../redux/reducers/rootReducer";
import "./ImagePreview.scss";

interface Props {}

const ImagePreview: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const { imagePreview } = useSelector((state: RootState) => state.ui);

	const handleCloseClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
		e.button === 0 && dispatch(setImagePreview(null));

	return (
		<div className="imagePreview" onMouseDown={e => handleCloseClick(e)}>
			{imagePreview && <img src={imagePreview} alt="" />}
		</div>
	);
};

export default ImagePreview;
