import "./home.css";
import React, { useState, useEffect } from "react";
import Header from "./Header";


function Profile(){

 return(<>

 <Header selected={"profile"}></Header>

   <h3>Username: </h3> {localStorage.getItem("username")}
    <br/>
    <h3>Email: </h3>{localStorage.getItem("email")}
 </>);
    
}



export default Profile;