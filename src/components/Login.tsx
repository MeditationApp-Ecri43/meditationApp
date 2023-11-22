import React, { useState } from 'react';
import { loginProps } from '../App';

const Login = (props: loginProps) => {
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
