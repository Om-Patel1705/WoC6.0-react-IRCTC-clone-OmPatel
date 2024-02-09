import React, { useState, useEffect } from "react";
import Header from "./Header";
import "./home.css";

async function fetchBookList(username) {
  const response = await fetch("https://irctc-woc.onrender.com/booklist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });

  const data = await response.json();
  return data.data;
}

function Booklist() {
  const [bookList, setBookList] = useState([]);
  const [isEmpty, setIsempty] = useState(true);

  async function cancelTicket(tid) {
    try {
      const username = localStorage.getItem("username");

      const response = await fetch("https://irctc-woc.onrender.com/cancel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, tid }),
      });

      const updatedList = await response.json();

      if (updatedList.data == null) {
        setIsempty(true);
        setBookList(updatedList.data);
      } else {
        setIsempty(false);
        setBookList(updatedList.data);
      }
      
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem("username");
        const data = await fetchBookList(username);

        
        if (data == null) {
          setIsempty(true);
        } else {
          setIsempty(false);
          setBookList(data);
        }

      } catch (error) {
        console.error("Error fetching book list:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
    <Header selected={'bookList'}/>
     { isEmpty==false && (
      <div>
        {
          <ul className="bookedTrainContainer">
            {bookList.map((book, index) => (
              <li key={index} >
                <ul className="bookedTrains">
                  <li>Username: {book.username}</li>
                  <li>Date: {book.date}</li>
                  <li>Trainnumber: {book.trainnumber}</li>
                  <li>Source: {book.source}</li>
                  <li>Destination: {book.destination}</li>
                  <li> Departuretime: {book.departuretime}</li>
                  <li> Arrivaltime: {book.arrivaltime}</li>
                  <li>
                    <button className="cancel"
                      onClick={() => {
                        cancelTicket(book.bookid);
                      }}
                    >
                      Cancel
                    </button>
                  </li>
                </ul>
                <br />
                <br />
              </li>
            ))}
          </ul>
        }
      </div>
      ) }
      {isEmpty==true && <h1>No Result</h1>}
    </div>
  );
}

export default Booklist;
