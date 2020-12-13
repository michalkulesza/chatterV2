import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import LoginForm from "./LoginForm";

const initState = {
	error: {
		auth: null,
	},
	auth: {
		loading: false,
	},
};

const middlewares = [thunk];
const store = configureMockStore(middlewares)(initState);

describe("LoginForm", () => {
	it("Renders LoginForm properly", () => {
		const wrapper = mount(
			<Provider store={store}>
				<LoginForm />
			</Provider>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it("Renders inputs", () => {
		const wrapper = mount(
			<Provider store={store}>
				<LoginForm />
			</Provider>
		);

		expect(wrapper.find("input").length).toBe(3);
	});
});
