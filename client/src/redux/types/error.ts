export const ADD_AUTH_ERROR = "ADD_AUTH_ERROR";
export const CLEAR_AUTH_ERROR = "CLEAR_AUTH_ERROR";

export interface errorState {
	auth: null | string;
}

export interface addAuthErrorAction {
	type: typeof ADD_AUTH_ERROR;
	payload: string;
}

export interface clearAuthErrorAction {
	type: typeof CLEAR_AUTH_ERROR;
}

export type errorTypes = addAuthErrorAction | clearAuthErrorAction;
