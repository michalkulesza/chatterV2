import React from "react";
import { LoginForm } from "../../containers";

import "./Login.scss";

interface Props {}

const Login: React.FC<Props> = () => {
	return (
		<div className="Login">
			<LoginForm></LoginForm>
		</div>
	);
};

export default Login;
