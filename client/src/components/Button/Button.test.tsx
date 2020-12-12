import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";

import Button from "./Button";

describe("Button", () => {
	it("Renders children", () => {
		const element = <span>Test</span>;

		const wrapper = shallow(<Button>{element}</Button>);

		expect(wrapper.contains(element)).to.equal(true);
	});
});
