import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";

import FormButton from "./FormButton";

describe("FormButton", () => {
	it("Renders children", () => {
		const element = <span>Test</span>;

		const wrapper = shallow(<FormButton>{element}</FormButton>);

		expect(wrapper.contains(element)).to.equal(true);
	});
});
