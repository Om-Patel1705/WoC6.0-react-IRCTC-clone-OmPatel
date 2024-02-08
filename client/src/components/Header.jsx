import "./home.css";
import React, { useState, useEffect } from "react";

function Header({ selected }) {
  const [home, setHome] = useState('');
  const [bookList, setBookList] = useState('');
  const [aboutus, setaboutUs] = useState('');
  const [profile, setprofile] = useState('');

  useEffect(() => {
    if (selected === 'home') {
      setHome('home');
      setBookList(''); 
      setaboutUs('');
      setprofile('');
    } else if (selected === 'bookList') {
      setBookList('bookList');
      setHome(''); 
      setaboutUs('');
      setprofile('');
    }
    else if(selected === 'aboutus'){
     setaboutUs('about');
     setBookList('');
     setHome('');
     setprofile('');
    }
    else if (selected === 'profile') {
      setprofile('profile');
      setHome(''); 
      setaboutUs('');
      setBookList('');
    }
  }, [selected]);

  return (
    <div className="container">
      <ul className="nav nav-pills">
        <li className="nav-item" key={1}>
          <a href="/home" className={`nav-link active ${home}`} aria-current="page">
            Home
          </a>
        </li>
        <li className="nav-item" key={2}>
          <a href="/booklist" className={`nav-link ${bookList}`}>
            Booklist
          </a>
        </li>
        <li className="nav-item" key={3}>
          <a href="/aboutus" className={`nav-link ${aboutus}`} >
            About Us
          </a>
        </li>
        <li className="nav-item" key={4}>
          <a href="/profile" className={`nav-link ${profile}`}>
            {localStorage.getItem("username")}
          </a>
        </li>
        <li className="nav-item" key={5}>
          <a
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("username");
              localStorage.removeItem("email");
            }}
            href="/home"
            className="nav-link"
          >
            LogOut
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Header;
