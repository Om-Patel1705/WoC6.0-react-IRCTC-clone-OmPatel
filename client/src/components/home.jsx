import React, { useEffect, useState } from "react";
import "./home.css";
import imageSrc from "./irctc.jpg";
import DatePicker from "react-datepicker";
import PayDetails from "./payDetails";
import "react-datepicker/dist/react-datepicker.css";
// import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Home() {

  const name = localStorage.getItem("username");
  const [date, setDate] = useState(new Date());
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [trainid, settrainid] = useState();
  const [notfound, setNotfound] = useState(false);
  const[loading,setloading]=useState(false);


useEffect(()=>{ if(searchResults){
  setloading(false);
  scrollToSection("searchresult")};},[searchResults]);
useEffect(()=>{ if(showPaymentDetails)scrollToSection("paymentdetails"); },[showPaymentDetails]);

  function handleShowPaymentDetails(tid) {
    setShowPaymentDetails(true);
    settrainid(tid);
    
  }

  function scrollToSection(sectionId) {
    var section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
   
}

  async function handleSearch() {
    setloading(true);
    try {
      console.log(date);
      const response = await fetch("http://localhost:8000/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ source, destination, date }),
      });

      if (response.ok) {
        const clonedResponse = response.clone(); // Clone the response
        const results = await clonedResponse.json();
        console.log(results.data);
        setSearchResults(results.data || []);

        if (searchResults.length === 0) setNotfound(true);
      } else {
        setloading(false);
        console.log("Error in fetching data");
      }
      
    } catch (error) {
      setloading(false);
      console.error("Error:", error);
    }
    
  }

  return (
    <div>
      <Header selected={"home"} />
      <div className="welcome">
        <h1>Welcome</h1>
        <p>
          Revolutionize your travel experience with our train travel
          website,offering seamless booking,real-time updates,and current
          itineraries.Explore the world by rail,where every journey is a
          story,waiting to be written.{" "}
        </p>
      </div>
      <div className="searchinterface">
        <div className="journey">
          <div>
            <h1 style={{ marginBottom: 0 + "px" }}>Select Your Journey</h1>

            <br />
            <div className="from-to">
              <label>From:</label>
              <input
                type="text"
                placeholder="Your Location"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              ></input>
              <br />
              <br />
              <br />
              <label>To :</label>
              <br />
              <input
                type="text"
                placeholder="Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              ></input>
            </div>

            <br />
          </div>
          <div>
            <h2 style={{ marginTop: 0 + "px" }}>Date</h2>
            <DatePicker
              closeOnScroll={true}
              minDate={new Date()}
              showIcon
              toggleCalendarOnIconClick
              selected={date}
              onChange={(date) => setDate(date)}
            />
          </div>
          <br />
          <div>
            <label>All Classes</label>
            <br />
            <select>
              <option value="All classes">All Classes</option>
              <option value="second siting">Second Sitting(2S)</option>
              <option value="Ac 3 tier">AC 3 Tier(3A)</option>\
              <option value="ac chair car">AC Chair Car(CC)</option>
              <option value="exec. chair car">Exec. Chair Car(Ec)</option>
            </select>
          </div>
          <br />
          <div>
            <label>Categories</label>
            <br />
            <select>
              <option value="general">GENERAL</option>
              <option value="ladies">LADIES</option>
              <option value="lower berth/sr.citizen">
                LOWER BERTH/SR. CITIZEN
              </option>
              <option value="person with disability">
                PERSON WITH DISABILITY
              </option>
              <option value="duty pass">DUTY PASS</option>
              <option value="tatkal">TATKAL</option>
            </select>
          </div>
          <br />
          <button className="search" onClick={handleSearch}>
          SEARCH

          </button>
          <br/>
          <br/>
          {loading && <div className="loader"></div>}
          {searchResults.length > 0 && (
            <div >
              <h2>Search Results</h2>
              <ul id="searchresult">
                {searchResults.map((result,index) => (
                  <div>
                    <li className="searchresult" key={index}>

                    <ul>
                      <li><span>Train Number: </span>{result.trainnumber}</li>
                      <li><span>Source: </span>{result.source}</li>
                      <li><span>Destination: </span>{result.destination}</li>
                    </ul>
                      
                      <button onClick={() => handleShowPaymentDetails(result.tid)}>
                       Book
                      </button>
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          )}

          {searchResults.length === 0 && notfound && <h3>Not found😕</h3>}
        </div>
        <div>
          <img src={imageSrc} alt="Description of the image" />
        </div>
      </div>
      <div id="paymentdetails">
        {showPaymentDetails && <PayDetails tid={trainid} log={name} date={date}/>}
        <br />
      </div>
      <br />
    </div>
  );
}

export default Home;
