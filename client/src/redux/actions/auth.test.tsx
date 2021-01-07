import { loginWithoutPassword, loginWithPassword, registerUser } from "./user";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import PATH from "../../config/path";

const axiosMock = new MockAdapter(axios);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Auth actions", () => {
	const store = mockStore({});
	beforeEach(() => {
		axiosMock.reset();
		store.clearActions();
	});

	const username = "testUser";
	const password = "testPassword";

	it("loginWithoutPassword returns correct actions", async () => {
		axiosMock.onPost(`${PATH}/auth/join`).replyOnce(200);

		const expectedActions = [
			{
				payload: true,
				type: "SET_LOADING",
			},
			{
				payload: {
					registered: false,
					username,
				},
				type: "SET_USER",
			},
			{
				payload: false,
				type: "SET_LOADING",
			},
		];

		return store.dispatch(loginWithoutPassword(username)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it("loginWithPassword returns correct actions", async () => {
		axiosMock.onPost(`${PATH}/auth/login`).replyOnce(200);

		const expectedActions = [
			{
				payload: true,
				type: "SET_LOADING",
			},
			{
				payload: {
					registered: true,
					username: "testUser",
				},
				type: "SET_USER",
			},
			{
				payload: false,
				type: "SET_LOADING",
			},
		];

		return store.dispatch(loginWithPassword(username, password)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it("registerUser returns correct actions", async () => {
		axiosMock.onPost(`${PATH}/auth/register`).replyOnce(200);

		const expectedActions = [
			{
				payload: true,
				type: "SET_LOADING",
			},
			{
				payload: {
					registered: true,
					username,
				},
				type: "SET_USER",
			},
			{
				payload: false,
				type: "SET_LOADING",
			},
		];

		return store.dispatch(registerUser(username, password)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});
