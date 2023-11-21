// import React, { useState } from 'react'
// import { useAppSelector, useAppDispatch } from '../hooks'
// import { login, logout, signup } from '../loginSlice'
// export function Login() {
// }


// export default Login



//---------------was inside Login function----------------------
//  // The `state` arg is correctly typed as `RootState` already
//  const count = useAppSelector((state) => state.counter.value)
//  const dispatch = useAppDispatch()

//  // omit rendering logic

// Login.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './reducers/authReducer'; // Import your action creator

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // You may want to add validation and authentication logic here
    const user = { username, password };
    dispatch(login(user));
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
