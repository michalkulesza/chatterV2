import { LOGIN_WITHOUT_PASSWORD } from "../types/auth";
import axios from "axios";

export const loginWithoutPassword = (username: string) => {
	return {
		type: LOGIN_WITHOUT_PASSWORD,
		payload: username,
	};
};
