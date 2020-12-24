import { combineReducers } from "redux";
import user from "./user";
import error from "./error";
import ui from "./ui";
import room from "./room";
import misc from "./misc";

const rootReducer = combineReducers({
	user,
	error,
	ui,
	room,
	misc,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
