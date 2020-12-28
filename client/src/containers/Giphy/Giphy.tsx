import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid, SearchBar, SearchContext, SuggestionBar } from "@giphy/react-components";
import "./Giphy.scss";
import { addMessage, sendMessage } from "../../redux/actions/room";
import { RootState } from "../../redux/reducers/rootReducer";
import { profile } from "console";
import { toggleGiphyPicker } from "../../redux/actions/ui";

interface Props {}

const Giphy: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const { fetchGifs, searchKey } = useContext(SearchContext);
	const { username, profileImage } = useSelector((state: RootState) => state.user);

	const handleGifClick = (gifID: React.ReactText) => {
		if (username) {
			dispatch(
				sendMessage({
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
				})
			);

			dispatch(toggleGiphyPicker());
		}
	};

	return (
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
	);
};

export default Giphy;
