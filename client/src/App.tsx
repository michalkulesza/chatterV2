import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { RootState } from "./redux/reducers/rootReducer";
import { HOME, CHAT } from "./constants/routes";
import { useSelector } from "react-redux";

import { Login, Chat } from "./pages";

const App: React.FC = () => {
	const { username, avatarSelected } = useSelector((state: RootState) => state.user);

	return (
		<Switch>
			<Route exact path="/">
				{username && avatarSelected ? <Redirect to={CHAT} /> : <Login />}
			</Route>
			<Route exact path="/chat">
				{username && avatarSelected ? <Chat /> : <Redirect to={HOME} />}
			</Route>
			<Route path="/">
				<Redirect to={HOME} />
			</Route>
		</Switch>
	);
};

export default App;
