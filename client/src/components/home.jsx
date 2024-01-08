import React from 'react';
import "./home.css";
import imageSrc from './Irctc.jpg';
function Home(){
  return (
  <div>
    

  <div class="container">
     <ul class="nav nav-pills">
        <li class="nav-item">એ હાલો....</li>
        <li class="nav-item"><a href="#" class="nav-link active" aria-current="page">Home</a></li>
        <li class="nav-item"><a href="#" class="nav-link">Booklist</a></li>
        <li class="nav-item"><a href="#" class="nav-link">About Us</a></li>
      </ul>
  </div>
  <div class="welcome">
    <h1>Welcome,</h1>
    <p>Revolutionize your travel experience with our train travel website,offering seamless booking,real-time updates,and current itineraries.Explore the world by rail,where every journey is a story,waiting to be written. </p>
    <img src={imageSrc} alt="Description of the image" />
  </div>
  </div>
  );
};

export default Home;