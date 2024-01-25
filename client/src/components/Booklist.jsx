import React, { useState, useEffect } from "react";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem('username');
        const data = await fetchBookList(username);
        setBookList(data);
       
      } catch (error) {
        console.error("Error fetching book list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    
  }, []); // Empty dependency array means this effect runs once on mount
  return (
    <div>
      {  (
        <ul>
          {bookList.map((book, index) => (
            <li key={index}><ul>
              <li>Username: {book.username}</li>
              <li>Date: {book.date}</li>
              <li>Trainnumber: {book.trainnumber}</li>
              <li>Source: {book.source}</li>
              <li>Destination: {book.destination}</li>
              <li> Departuretime: {book. departuretime}</li>
              <li> Arrivaltime: {book. arrivaltime}</li>
            </ul>
            <br/>
          <br/></li>

          
          ))}

         
        </ul>
      )}

     
     
    </div>
  );
}

export default Booklist;
