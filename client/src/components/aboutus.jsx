import "./home.css";
import React, { useState, useEffect } from "react";
import Header from "./Header";


function aboutus(){

    return (
    <div>
    <Header selected={"aboutus"}/>
    
        <div>
          <h2>Friendly Interface</h2>
          <p>
            Our app boasts an incredibly intuitive and -friendly interface,
            ensuring that the process of searching,selecting and booking train
            tickets is a breeze. With a clean and organized designs,s can
            navigate effortlessly,making their booking experience enjoyable and
            efficient.
          </p>
        </div>
        <div>
          <h2>Extensive Train Options</h2>
          <p>
            Gain access to an extensive database of train schedules and
            routes,providing s with a comprehensive list of options.Our app's
            advanced filtering and sorting features empower s to quickly find
            the most suitable trains based on their preference,ensuring a
            tailored and convenient experience.
          </p>
        </div>
        <div>
          <h2>Real Time Availability</h2>
          <p>
            Stay informed by real-time updates on seat availability and ticket
            status. Recieve instant confirmation for booked tickets, eliminating
            any uncertainty and allowing s to plan their journey with
            confidence.
          </p>
        </div>
        <div>
          <h2>Personalized Account</h2>
          <p>
            Enjoy the benefits of a Personalized account,allowing for quick and
            efficient booking. Save preference,access booking history, and
            tailor the app to individual needs,providing a seamlessm and
            Personalized experience for every .
          </p>
        </div>
      </div>);
}


export default aboutus;