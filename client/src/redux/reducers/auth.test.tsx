import auth from "./auth";
import * as types from "../types/auth";

describe("Auth reducer", () => {
	it("Should return initial state", () => {
		const expectedObject = { loading: false, registered: null, username: null };

		expect(auth(undefined, {})).toEqual(expectedObject);
	});

	it("Should handle SET_USER", () => {
		const testUser = {
			username: "tester",
			registered: true,
		};

		const expectedObject = { loading: false, registered: true, username: testUser.username };

		expect(
			auth(undefined, {
				type: types.SET_USER,
				payload: testUser,
			})
		).toEqual(expectedObject);
	});

	it("Should handle SET_LOADING", () => {
		const expectedObject = { loading: true, registered: null, username: null };

		expect(
			auth(undefined, {
				type: types.SET_LOADING,
				payload: true,
			})
		).toEqual(expectedObject);
	});
});
