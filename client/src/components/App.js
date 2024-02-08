import { React, useEffect } from "react";
import Register from "./register";
import Home from "./home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Booklist from "./Booklist";
import AboutUs from "./aboutus";
import SignUp from "./signup";
import Profile from "./profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<ProtectedRoute />} />
        <Route path="/" element={<Register />} />
        <Route path="/booklist" element={<Booklist />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

 function ProtectedRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("Masdasd");
    return <Navigate to="/" />;
  } else {
    const user = jwtDecode(token);
    console.log(user);

    // localStorage.removeItem('token');
    return <Home />;
  }
}

export default App;
