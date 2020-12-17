import { combineReducers } from "redux";
import auth from "./auth";
import error from "./error";
import ui from "./ui";
import room from "./room";

const rootReducer = combineReducers({
	auth,
	error,
	ui,
	room,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
