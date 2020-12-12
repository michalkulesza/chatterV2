export const LOGIN_WITHOUT_PASSWORD = "LOGIN_WITHOUT_PASSWORD";
export const LOGIN_WITH_PASSWORD = "LOGIN_WITH_PASSWORD";
export const SET_USER = "SET_USER";

export interface authState {
	username: string | null;
	registered: boolean | null;
}

export interface setUser {
	type: typeof SET_USER;
	payload: {
		username: string;
		registered: boolean;
	};
}

export type authTypes = setUser;
