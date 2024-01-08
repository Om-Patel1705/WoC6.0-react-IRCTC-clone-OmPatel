import React, { useState } from 'react';
import Home from "./home";
import SignUp from './signup';
import { useNavigate } from "react-router-dom"; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [redirectToSignUp, setRedirectToSignUp] = useState(false);
  const navigate = useNavigate(); 


  function handleLogin() {
    if (username && password) {
      setIsLoggedIn(true);
    } else {
      alert('Please enter all required information');
    }
  }

  if (isLoggedIn) {
     return <Home/>;
  }

  function handleSignup() {

    
    setRedirectToSignUp(true);
  }

  if (redirectToSignUp) {
    return <SignUp/>;
  }

  return (
    <div className="container">
      <form>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <div>
          Don't have an account?
          <button type="button" onClick={handleSignup}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;