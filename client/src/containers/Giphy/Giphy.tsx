import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";

import { Grid, SearchBar, SearchContext, SuggestionBar } from "@giphy/react-components";
import { RootState } from "../../redux/reducers/rootReducer";
import { toggleGiphyPicker } from "../../redux/actions/ui";
import { sendMessage } from "../../redux/actions/room";
import "./Giphy.scss";

interface Props {}

const Giphy: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const { fetchGifs, searchKey } = useContext(SearchContext);
	const { username, profileImage } = useSelector((state: RootState) => state.user);
	const { _id: room } = useSelector((state: RootState) => state.room);

	const handleClickOutside = () => dispatch(toggleGiphyPicker());

	const handleGifClick = (gifID: React.ReactText) => {
		if (username && room) {
			const message = {
				_id: "",
				author: {
					name: username,
					picture: profileImage,
				},
				content: "",
				created: new Date().toISOString(),
				giphyID: gifID,
				image: null,
				reactions: {
					"+1": 0,
					heart: 0,
					rolling_on_the_floor_laughing: 0,
					slightly_frowning_face: 0,
				},
			};

			dispatch(sendMessage(room, message));
			dispatch(toggleGiphyPicker());
		}
	};

	return (
		<OutsideClickHandler onOutsideClick={handleClickOutside}>
			<div className="giphy">
				<div className="search">
					<SearchBar />
				</div>
				<div className="suggestions">
					<SuggestionBar />
				</div>
				<div className="grid">
					<Grid
						key={searchKey}
						columns={2}
						width={400}
						fetchGifs={fetchGifs}
						noLink
						onGifClick={gif => handleGifClick(gif.id)}
						hideAttribution
					/>
				</div>
			</div>
		</OutsideClickHandler>
	);
};

export default Giphy;
