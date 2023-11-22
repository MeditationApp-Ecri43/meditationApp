import { ReactComponentElement, useState } from 'react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import Login from './components/Login.tsx';
import Timer from './components/Timer.tsx';

/* 
state: logged in? 
  if false:
    render login component
  if true:
    render Timer
*/

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [username, setUsername] = useState<string | null>(null);
  return (
    <>
      <div>
        <h1>Meditation App</h1>
        <p> "A wandering mind is an unhappy mind"</p>
      </div>
      <div>
        {isLoggedIn ? (
          <Timer isLoggedIn={isLoggedIn} username={username} />
        ) : (
          <Login
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
            username={username}
            setUsername={setUsername}
          />
        )}
      </div>
    </>
  );
};

export default App;
