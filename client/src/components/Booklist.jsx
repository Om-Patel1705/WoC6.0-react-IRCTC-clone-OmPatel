import React, { useState, useEffect } from "react";
import Header from "./Header";
import "./home.css";

async function fetchBookList(username) {
  const response = await fetch("http://localhost:8000/booklist", {
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
  const[loading,setloading]=useState(true);

  async function cancelTicket(tid) {
    try {
      const username = localStorage.getItem("username");

      const response = await fetch("http://localhost:8000/cancel", {
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
          setloading(false);
        } else {
          setIsempty(false);
          setloading(false);
          setBookList(data);
        }

      } catch (error) {
        console.error("Error fetching book list:", error);
      }
    };

    fetchData();
  }, []); 

  return (
    
    <div id="temp">
    <Header selected={'bookList'}/>

    {loading ? <div className="booklistloader"> <div className="loader l2"></div></div> : <div>{ isEmpty==false && (
      <div>
        {
          <ul className="bookedTrainContainer">
            {bookList.map((book, index) => (
              <li key={index} >
                <ul className="bookedTrains">
                  <li><span>Username: </span>{book.username}</li>
                  <li><span>Date: </span>{book.date}</li>
                  <li><span>Trainnumber: </span>{book.trainnumber}</li>
                  <li><span>Source: </span>{book.source}</li>
                  <li><span>Destination: </span>{book.destination}</li>
                  
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
      ) }</div>}
     
      {isEmpty==true && loading==false && <h1>No Result</h1>}
    </div>
  );
}

export default Booklist;
