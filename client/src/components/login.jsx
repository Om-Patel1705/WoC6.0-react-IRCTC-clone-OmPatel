import React, { useState } from 'react';
import SignUp from './signup';
import Home from './home';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [redirectToSignUp, setRedirectToSignUp] = useState(false);
  const [whoLogin, setWhoLog] = useState("");

  async function handleLogin() {
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Authentication successful:", data.message);
         setWhoLog(username);
        setIsLoggedIn(true);
      } else {
        console.error("Authentication failed:", data.message);
        alert("Check your password or username or signup");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  if (isLoggedIn) {
     return <Home log={whoLogin}/>;
  }

  function handleSignup() {
    setRedirectToSignUp(true);
  }

  if (redirectToSignUp) {
    return <SignUp />;
  }

  return (
    <div className="container">
      <form>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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

export default  Login ; // Exporting Login component and whoLoggedin state
