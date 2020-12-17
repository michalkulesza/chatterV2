import { combineReducers } from "redux";
import auth from "./auth";
import error from "./error";
import ui from "./ui";
import room from "./room";
import misc from "./misc";

const rootReducer = combineReducers({
	auth,
	error,
	ui,
	room,
	misc,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
