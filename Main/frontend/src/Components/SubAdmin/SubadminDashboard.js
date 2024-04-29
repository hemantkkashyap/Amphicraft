import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCalendarCheck,
  faChess,
  faCubes,
  faFootball,
  faMusic,
  faPenToSquare,
  faRankingStar,
  faSoccerBall,
  faUser,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Subadmin.css";

export default function SubadminDashboard() {
  const theme = useSelector((state) => state.auth.newTheme); // Get theme from Redux store

  // State to hold users data fetched from the API
  const [usersData, setUsersData] = useState([]);

  // State to hold the total number of users
  const [regularUsersCount, setRegularUsersCount] = useState(0);

  // State to hold the count of subadmins
  const [subadminsCount, setSubadminsCount] = useState(0);
  // State to hold the total number of events
  const [totalEventsCount, setTotalEventsCount] = useState(0);

  // State to hold the count of indoor events
  const [indoorEventsCount, setIndoorEventsCount] = useState(0);

  // State to hold the count of outdoor events
  const [outdoorEventsCount, setOutdoorEventsCount] = useState(0);

  // State to hold the count of tech events
  const [techEventsCount, setTechEventsCount] = useState(0);

  // State to hold the count of cultural events
  const [culturalEventsCount, setCulturalEventsCount] = useState(0);

  // Function to fetch users data from the API
  const fetchUsersData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/getalluser");
      const data = await response.json();
      setUsersData(data);

      const subadmins = data.filter((user) => user.isSubAdmin);
      setSubadminsCount(subadmins.length);

      // Calculate the count of regular users
      const regularUsers = data.filter(
        (user) => !user.isAdmin && !user.isSubAdmin
      );
      setRegularUsersCount(regularUsers.length);
    } catch (error) {
      console.error("Error fetching users data:", error);
    }
  };

  // Function to fetch total number of events
  const fetchEventsCount = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/events");
      const eventsData = await response.json();
      // Assuming eventsData is an array of events, you can get its length
      setTotalEventsCount(eventsData.length);
      // Count events based on category
      const indoorEvents = eventsData.filter(
        (event) => event.category === "Indoor"
      );
      setIndoorEventsCount(indoorEvents.length);
      const outdoorEvents = eventsData.filter(
        (event) => event.category === "Outdoor"
      );
      setOutdoorEventsCount(outdoorEvents.length);
      const techEvents = eventsData.filter(
        (event) => event.category === "Tech"
      );
      setTechEventsCount(techEvents.length);
      const culturalEvents = eventsData.filter(
        (event) => event.category === "Cultural"
      );
      setCulturalEventsCount(culturalEvents.length);
    } catch (error) {
      console.error("Error fetching events data:", error);
    }
  };

  // Call fetchUsersData() when the component mounts
  useEffect(() => {
    fetchUsersData();
    fetchEventsCount();
  }, []); // Empty dependency array to run effect only once after mount

  return (
    <>
      <div className={`Main ${theme}`}>
        <div className={`admincontanier ${theme}`}>
          <div className="sidebar">
            <ul>
              <Link to={"/allparticipent"}>
                <li>
                  <FontAwesomeIcon id="icon" icon={faRankingStar} />
                  <p>Event Registrations</p>
                </li>
              </Link>
              <Link to={"/time"}>
                <li>
                  <FontAwesomeIcon id="icon" icon={faCalendar} />
                  <p>Calender</p>
                </li>
              </Link>
              <Link to={"/addevent"}>
                <li>
                  <FontAwesomeIcon id="icon" icon={faCalendarCheck} />
                  <p>Add Event</p>
                </li>
              </Link>
            </ul>
          </div>
          <div className={`details ${theme}`}>
            <h2>Dashboard</h2>

            <div className="graph">
              <div className="Bars">
                <p>Details</p>
                <div className="all">
                  <div className="box">
                    <div className="bars">
                      <div className="bar">
                        <div className="value">{indoorEventsCount}</div>
                        <div id="allusers" className="height"></div>
                      </div>
                    </div>
                    <div className="bars">
                      <div className="bar">
                        <div className="value">{outdoorEventsCount}</div>
                        <div id="subadmins" className="height"></div>
                      </div>
                    </div>
                    <div className="bars">
                      <div className="bar">
                        <div className="value">{techEventsCount}</div>
                        <div id="allevents" className="height"></div>
                      </div>
                    </div>
                    <div className="bars">
                      <div className="bar">
                        <div className="value">{culturalEventsCount}</div>
                        <div id="allevents" className="height"></div>
                      </div>
                    </div>
                  </div>
                  <div className="colorvalue">
                    <div className="elem">
                      <div className="color"></div>
                      <div className="text">Indoor</div>
                    </div>
                    <div className="elem">
                      <div
                        className="color"
                        style={{ background: "purple" }}
                      ></div>
                      <div className="text">Outdoor</div>
                    </div>
                    <div className="elem">
                      <div
                        className="color"
                        style={{ background: "blue" }}
                      ></div>
                      <div className="text">Tech</div>
                    </div>
                    <div className="elem">
                      <div
                        className="color"
                        style={{ background: "blue" }}
                      ></div>
                      <div className="text">Cultural</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="Eventdetails">
                <div class="cardContainer">
                  <div class="card">
                    <p class="city">INDOOR</p>
                    <p class="temp">{indoorEventsCount}</p>
                   
                  </div>
                </div>

                <div class="cardContainer">
                  <div class="card">
                    <p class="city">OUTDOOR</p>
                    <p class="temp">{outdoorEventsCount}</p>
                  
                  </div>
                </div>

                <div class="cardContainer">
                  <div class="card">
                    <p class="city">TECHNICAL</p>
                    <p class="temp">{techEventsCount}</p>
                   
                  </div>
                </div>

                <div class="cardContainer">
                  <div class="card">
                    <p class="city">CULTURAL</p>
                    <p class="temp">{culturalEventsCount}</p>
               
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
