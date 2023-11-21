import { useState } from 'react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './App.css';
import Login from './components/Login.ts'
import Timer from './components/Timer.ts'

/* 
state: logged in? 
  if false:
    render login component
  if true:
    render sits
*/



function App() {
  const loggedIn = store.value
  return (
    <>
      <div>
        <h1>Meditation App</h1>
        <p> "A wandering mind is an unhappy mind"</p>
      </div>
      <div>{loggedIn ? <Timer /> : <Login/>}</div>
    </>
  );
}

export default App;
