import { combineReducers } from "redux";
import auth from "./auth";
import error from "./error";

const rootReducer = combineReducers({
	auth,
	error,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
