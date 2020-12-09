import React from 'react';
import './Login.scss';

import { LoginForm } from '../../';

interface Props {}

const Login: React.FC<Props> = () => {
  return (
    <div className="Login">
      <LoginForm></LoginForm>
    </div>
  );
};

export default Login;
