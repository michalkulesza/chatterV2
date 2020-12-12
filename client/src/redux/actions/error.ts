import { ADD_AUTH_ERROR, CLEAR_AUTH_ERROR } from "../types/error";

export const addAuthError = (error: string, time: number = 3000) => {
	return async (dispatch: any) => {
		dispatch({
			type: ADD_AUTH_ERROR,
			payload: error,
		});

		setTimeout(() => dispatch(clearAuthError()), time);
	};
};

export const clearAuthError = () => {
	return {
		type: CLEAR_AUTH_ERROR,
	};
};
