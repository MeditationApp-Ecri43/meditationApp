import React, { useState } from 'react';
import { LoginProps } from '../../types';

const Login = (props: LoginProps) => {
  const handleSubmit = (): void => {
    // e.preventDefault();
    props.setIsLoggedIn(true);
  };

  return (
    <div>
      <button onClick={(): void => handleSubmit()}>LOGIN</button>
    </div>
  );
};

export default Login;
