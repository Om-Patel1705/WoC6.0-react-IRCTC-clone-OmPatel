import React, { useState } from "react";
import SignUp from "./signup";
import { useNavigate ,Navigate} from "react-router-dom";
import "./home.css"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirectToSignUp, setRedirectToSignUp] = useState(false);
 
  const navigate = useNavigate();

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
       
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);

        navigate("/home");
      } else {
        console.error("Authentication failed:", data.message);
        alert("Check your password or username or signup");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  
  function handleSignup() {
    setRedirectToSignUp(true);
  }

  if (redirectToSignUp) {
    navigate("/signup");
  }

  return (
    <div className="container login">
    <div className="card">

    <h1 className="log">Login</h1>
      <form>
      <div className="usernamepass">
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <br/>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br/>
        <button type="button" className="loginbutton" onClick={handleLogin}>
          Login
        </button></div>
      
        <br/>
       
        <div>
        <br/>
        <br/>
        
        
          Don't have an account?
          <br/>
          
          <button type="button" onClick={handleSignup}>
            Sign Up
          </button>
        </div>
      </form>
    </div></div>
  );
};

export default Login; 