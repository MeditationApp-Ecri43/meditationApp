import React, { useState } from 'react';
import { loginProps } from '../App';

const Login = (props: loginProps) => {
  const handleSubmit = (): void => {
    // e.preventDefault();
    console.log('hi');
    props.setIsLoggedIn(true);
    console.log(props.isLoggedIn);
  };

  return (
    <div>
      <button onClick={(): void => handleSubmit()}>LOGIN</button>
    </div>
  );
};

export default Login;
