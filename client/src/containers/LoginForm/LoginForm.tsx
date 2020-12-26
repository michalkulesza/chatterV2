import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginWithoutPassword, loginWithPassword, registerUser } from "../../redux/actions/user";
import { addError } from "../../redux/actions/ui";
import { RootState } from "../../redux/reducers/rootReducer";
import "./LoginForm.scss";

import FormInput from "./FormInput/FormInput";
import AvatarSelection from "./AvatarSelection/AvatarSelection";
import { Button } from "../../components";

interface Props {}

const LoginForm: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const { username, profileImage } = useSelector((state: RootState) => state.user);
	const { loading, error } = useSelector((state: RootState) => state.ui);

	const [register, setRegister] = useState(false);
	const [password, setPassword] = useState("");
	const [user, setUser] = useState("");

	const hasLength = (string: string, length: number) => string.length >= length;
	const validName = (name: string) => hasLength(name, 3) && name !== "admin";
	const validPassword = (password: string) => hasLength(password, 4);

	const showAvatarSelection = (register || validPassword(password)) && username;

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const passwordEntered = password.length > 0;

		if (!validName(user)) return dispatch(addError("Username must be at least 3 characters long."));

		if (!validPassword(password) && (register || passwordEntered))
			return dispatch(addError("Password must be at least 4 characters long."));

		if (passwordEntered && register) return dispatch(registerUser(user, password, profileImage));
		if (passwordEntered) return dispatch(loginWithPassword(user, password));
		dispatch(loginWithoutPassword(user));
	};

	return (
		<div className="LoginForm">
			<div className="Container">
				<div className={`login ${showAvatarSelection && "hidden"}`}>
					<div className="Logo">Chatter</div>
					<div className="Title">Join In</div>
					<form onSubmit={e => handleSubmit(e)}>
						<FormInput
							autoFocus
							type="text"
							setState={setUser}
							state={user}
							label="Username"
							disabled={loading}
							required
						/>
						<FormInput
							type="password"
							setState={setPassword}
							state={password}
							label="Password (optional)"
							required={register}
							disabled={loading}
						/>
						<FormInput
							type="checkbox"
							setState={setRegister}
							state={register}
							label="I want to register Username"
							disabled={loading}
							labelColor="white"
						/>
						{error && <div className="error">{error}</div>}
						<Button loading={loading}>Join</Button>
					</form>
				</div>
				<AvatarSelection hidden={!showAvatarSelection} password={password} />
			</div>
		</div>
	);
};

export default LoginForm;
