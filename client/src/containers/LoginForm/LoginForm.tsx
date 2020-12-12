import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginWithoutPassword } from "../../redux/actions/auth";
import { addAuthError } from "../../redux/actions/error";
import { RootState } from "../../redux/reducers/rootReducer";
import "./LoginForm.scss";

import FormInput from "./FormInput/FormInput";
import FormButton from "./FormButton/FormButton";

interface Props {}

const LoginForm: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const error = useSelector((state: RootState) => state.error.auth);
	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");
	const [register, setRegister] = useState(false);

	const hasLength = (string: string, length: number) => string.length >= length;

	const validName = (name: string) => hasLength(name, 3) && name !== "admin";

	const validPassword = (password: string) => hasLength(password, 4);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const passwordEntered = password.length > 0;

		if (!validName(user)) return dispatch(addAuthError("Username must be at least 3 characters long."));

		if (!validPassword(password) && (register || passwordEntered))
			return dispatch(addAuthError("Password must be at least 4 characters long."));

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
					{error && <div className="error">{error}</div>}
					<FormButton>Join</FormButton>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
