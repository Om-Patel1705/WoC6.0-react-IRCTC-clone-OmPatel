import React, { useState } from "react";
import "./home.css";

import { useNavigate } from "react-router-dom";

function SignUp() {
  const [isRegistered, setRegistered] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [falseuser, setFalseuser] = useState("");

  const navigate = useNavigate();

  async function handlechange() {
    if (username && password && email) {
      try {
        const statusOfSignUp = await fetch("http://localhost:8000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ username, email, password }),
        });

        if (statusOfSignUp.ok) {
          localStorage.removeItem("token");
          localStorage.removeItem("username");

          const response = await statusOfSignUp.json();
          localStorage.setItem("token", response.token);
          localStorage.setItem("username", response.username);

          setRegistered(true);
        } else {
          setFalseuser("Username is taken!😕");
        }
      } catch (error) {
        console.log("Error posting data", error);
        alert("Error signing up");
      }
    } else {
      alert("Please enter all required information");
    }
  }

  try {
    if (isRegistered) {
      navigate("/home");
    }
  } catch (error) {
    console.error("Error navigating", error);
  }

  return (
    <div className="container login">
      <div className="card">
        <h1 className="reg">Registration</h1>

        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <br />
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {falseuser && <p className="falseuser">{falseuser}</p>}
        <br />

        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
        </div>
        <br />
        <button onClick={handlechange}>Sign up</button>
      </div>
    </div>
  );
}

export default SignUp;
