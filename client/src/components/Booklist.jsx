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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {bookList.map((book, index) => (
            <li key={index}>{book}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Booklist;
