import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginWithoutPassword } from "../../redux/actions/auth";
import "./LoginForm.scss";

import FormInput from "./FormInput/FormInput";
import FormButton from "./FormButton/FormButton";

interface Props {}

let timer: NodeJS.Timeout;

const LoginForm: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");
	const [register, setRegister] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		timer = setTimeout(() => setError(""), 2000);

		return () => clearTimeout(timer);
	}, [error]);

	const hasLength = (string: string, length: number) => string.length >= length;

	const validName = (name: string) => hasLength(name, 3) && name !== "admin";

	const validPassword = (password: string) => hasLength(password, 4);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const passwordEntered = password.length > 0;

		if (!validName(user)) return setError("Username must be at least 3 characters long.");
		if (!validPassword(password) && (register || passwordEntered))
			return setError("Password must be at least 4 characters long.");

		if (passwordEntered && register) return console.log("REGISTER");
		if (passwordEntered) return console.log("LOGIN WITHOUT PASSWORD");
		dispatch(loginWithoutPassword(user));
	};

	return (
		<div className="LoginForm">
			<div className="Container">
				<div className="Logo">Chatter</div>
				<div className="Title">Join In</div>
				<form onSubmit={e => handleSubmit(e)}>
					<FormInput type="text" setState={setUser} state={user} label="Username" required />
					<FormInput
						type="password"
						setState={setPassword}
						state={password}
						label="Password (optional)"
						required={register}
					/>
					<FormInput type="checkbox" setState={setRegister} state={register} label="I want to register Username" />
					<div className="error">{error}</div>
					<FormButton>Join</FormButton>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
