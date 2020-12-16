export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";

export interface uiState {
	sidebarVisible: boolean;
}

export interface toggleSidebarAction {
	type: typeof TOGGLE_SIDEBAR;
}

export type uiTypes = toggleSidebarAction;
