import { TOGGLE_SIDEBAR, ADD_ERROR, CLEAR_ERROR } from "../types/ui";

export const toggleSidebar = () => {
	return {
		type: TOGGLE_SIDEBAR,
	};
};

export const addError = (error: string, time: number = 3000) => {
	return async (dispatch: any) => {
		dispatch({
			type: ADD_ERROR,
			payload: error,
		});

		setTimeout(() => dispatch(clearError()), time);
	};
};

export const clearError = () => {
	return {
		type: CLEAR_ERROR,
	};
};
