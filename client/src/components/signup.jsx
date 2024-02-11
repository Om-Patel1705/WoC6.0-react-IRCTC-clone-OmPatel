import React, { useState } from "react";
import "./home.css";

import { useNavigate } from "react-router-dom";

function SignUp() {
  const [isRegistered, setRegistered] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [falseuser, setFalseuser] = useState("");
  const[loading,setloading]=useState(false);

  const navigate = useNavigate();

  async function handlechange() {
    setloading(true);
    
    if (username && password && email) {
      try {
        const statusOfSignUp = await fetch("https://irctc-woc.onrender.com/signup", {
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
          localStorage.setItem("email", email);

          setRegistered(true);
          
        } else {
          setFalseuser("Username is taken!😕");
          setloading(false);
        }
      } catch (error) {
        setloading(false);
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
    setloading(false);
    console.error("Error navigating", error);
  }

  return (
    <div className="l container login">
    <h1>Welcome to IRCTC</h1>
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
        <button className="signupbutton" onClick={handlechange}>Sign{loading && "ing"} up{loading && "..."}</button>
         </div>
    </div>
  );
}

export default SignUp;
