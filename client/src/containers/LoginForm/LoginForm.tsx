import React, { useState } from 'react';
import './LoginForm.scss';

import FormInput from './FormInput/FormInput';
import FormButton from './FormButton/FormButton';
import FormError from './FormError/FormError';

interface Props {}

const LoginForm: React.FC<Props> = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [error, setError] = useState('');

  return (
    <div className="LoginForm">
      <div className="Container">
        <div className="Logo">Chatter</div>
        <div className="Title">Join In</div>
        <form>
          <FormInput
            type="text"
            setState={setUser}
            state={user}
            label="Username"
            required
          />
          <FormInput
            type="password"
            setState={setPassword}
            state={password}
            label="Password (optional)"
            required={checkbox}
          />
          <FormInput
            type="checkbox"
            setState={setCheckbox}
            state={checkbox}
            label="I want to register Username"
          />
          <FormError error={error} />
          <FormButton>Join</FormButton>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
