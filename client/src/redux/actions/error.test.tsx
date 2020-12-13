import { addAuthError, clearAuthError } from "./error";
import { ADD_AUTH_ERROR, CLEAR_AUTH_ERROR } from "../types/error";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Auth actions", () => {
	const store = mockStore({});
	beforeEach(() => store.clearActions());

	it("addAuthError returns correct actions", async () => {
		const error = "test error";
		const expectedActions = [
			{
				payload: "test error",
				type: ADD_AUTH_ERROR,
			},
		];

		return store.dispatch(addAuthError(error)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it("clearAuthError returns correct actions", async () => {
		const expectedActions = [
			{
				type: CLEAR_AUTH_ERROR,
			},
		];

		store.dispatch(clearAuthError());

		expect(store.getActions()).toEqual(expectedActions);
	});
});
