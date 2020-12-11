import { LOGIN_WITHOUT_PASSWORD } from "../types/auth";

export const loginWithoutPassword = (username: string) => {
	return {
		type: LOGIN_WITHOUT_PASSWORD,
		payload: username,
	};
};
