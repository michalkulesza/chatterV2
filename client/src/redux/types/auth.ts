export const SET_USER = "SET_USER";
export const SET_LOADING = "SET_LOADING";

export interface authState {
	username: string | null;
	registered: boolean | null;
	loading: boolean;
}

export interface setUser {
	type: typeof SET_USER;
	payload: {
		username: string;
		registered: boolean;
	};
}

export interface setLoading {
	type: typeof SET_LOADING;
	payload: boolean;
}

export type authTypes = setUser | setLoading;
