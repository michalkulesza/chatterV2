export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";
export const SET_LOADING = "SET_LOADING";

export interface uiState {
	sidebarVisible: boolean;
	loading: boolean;
}

export interface toggleSidebarAction {
	type: typeof TOGGLE_SIDEBAR;
}

export interface setLoadingAction {
	type: typeof SET_LOADING;
	payload: boolean;
}

export type uiTypes = toggleSidebarAction | setLoadingAction;
