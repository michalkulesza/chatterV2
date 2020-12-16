import { combineReducers } from "redux";
import auth from "./auth";
import error from "./error";
import ui from "./ui";

const rootReducer = combineReducers({
	auth,
	error,
	ui,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
