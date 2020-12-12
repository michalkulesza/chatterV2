import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { Login, Chat } from "./pages";
import { RootState } from "./redux/reducers/rootReducer";
import { HOME, CHAT } from "./constants/routes";

const App: React.FC = () => {
	const auth = useSelector((state: RootState) => state.auth);
	return (
		<Switch>
			<Route exact path="/">
				{auth.username ? <Redirect to={CHAT} /> : <Login />}
			</Route>
			<Route exact path="/chat">
				{auth.username ? <Chat /> : <Redirect to={HOME} />}
			</Route>
			<Route path="/">
				<Redirect to={HOME} />
			</Route>
		</Switch>
	);
};

export default App;
