import React from 'react';
import { Route } from 'react-router-dom';
import { Login } from './views/pages';

const App: React.FC = () => {
  return (
    <Route path="/">
      <Login />
    </Route>
  );
};

export default App;
