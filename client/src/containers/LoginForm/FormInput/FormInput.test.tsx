import React from "react";
import { shallow, mount } from "enzyme";

import FormInput from "./FormInput";

describe("FormInput", () => {
	const setState = jest.fn();
	const state = "";
	const label = "Testlabel";

	it("Renders empty input with correct label", () => {
		const wrapper = shallow(<FormInput setState={setState} state={state} label={label} />);

		expect(wrapper.find("input").props().value).toEqual(state);
		expect(wrapper.find("label").children().contains(label)).toEqual(true);
	});

	it("Renders label with 'onTop' className when input focused", () => {
		const wrapper = mount(<FormInput setState={setState} state={state} label={label} />);

		wrapper.find("input").simulate("focus");
		expect(wrapper.find("label").hasClass("onTop")).toEqual(true);
	});

	it("Calls setState props on input change", () => {
		const wrapper = mount(<FormInput setState={setState} state={state} label={label} />);

		wrapper.find("input").simulate("change", { target: { value: "test" } });
		expect(setState).toHaveBeenCalledTimes(1);
	});
});
