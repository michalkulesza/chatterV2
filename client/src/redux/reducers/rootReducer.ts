import { combineReducers } from "redux";
import user from "./user";
import ui from "./ui";
import room from "./room";
import misc from "./misc";

const rootReducer = combineReducers({
	user,
	ui,
	room,
	misc,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
