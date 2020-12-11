//Auth
export const LOGIN_WITHOUT_PASSWORD = "LOGIN_WITHOUT_PASSWORD";
export const LOGIN_WITH_PASSWORD = "LOGIN_WITH_PASSWORD";
export const REGISTER_USER = "REGISTER_USER";

export interface loginWithoutPasswordAction {
	type: typeof LOGIN_WITHOUT_PASSWORD;
	payload: string;
}
