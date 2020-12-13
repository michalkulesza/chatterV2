import error from "./error";
import * as types from "../types/error";

const initState = { auth: null };

describe("Error reducer", () => {
	it("Should return initial state", () => {
		expect(error(undefined, {})).toEqual(initState);
	});

	it("Should handle ADD_AUTH_ERROR", () => {
		const testError = "testerror";

		const expectedObject = { auth: testError };

		expect(
			error(undefined, {
				type: types.ADD_AUTH_ERROR,
				payload: testError,
			})
		).toEqual(expectedObject);
	});

	it("Should handle CLEAR_AUTH_ERROR", () => {
		expect(
			error(undefined, {
				type: types.CLEAR_AUTH_ERROR,
			})
		).toEqual(initState);
	});
});
