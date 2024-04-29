import React, { useState, useEffect } from "react";
import "./Admin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faPenToSquare,
  faRankingStar,
  faUser,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [usersData, setUsersData] = useState([]);

  const [regularUsersCount, setRegularUsersCount] = useState(0);

  const [subadminsCount, setSubadminsCount] = useState(0);

  const [totalEventsCount, setTotalEventsCount] = useState(0);

  const [indoorEventsCount, setIndoorEventsCount] = useState(0);

  const [outdoorEventsCount, setOutdoorEventsCount] = useState(0);

  const [techEventsCount, setTechEventsCount] = useState(0);

  const [culturalEventsCount, setCulturalEventsCount] = useState(0);

  const fetchUsersData = async () => {
    try {
      const response = await fetch("https://amphicraft.vercel.app/api/auth/getalluser");
      const data = await response.json();
      setUsersData(data);

      const subadmins = data.filter((user) => user.isSubAdmin);
      setSubadminsCount(subadmins.length);

      const regularUsers = data.filter(
        (user) => !user.isAdmin && !user.isSubAdmin
      );
      setRegularUsersCount(regularUsers.length);
    } catch (error) {
      console.error("Error fetching users data:", error);
    }
  };

  const fetchEventsCount = async () => {
    try {
      const response = await fetch("https://amphicraft.vercel.app/api/auth/events");
      const eventsData = await response.json();
      setTotalEventsCount(eventsData.length);

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

  useEffect(() => {
    fetchUsersData();
    fetchEventsCount();
  }, []);

  return (
    <>
      <div className="Main">
        <div className="admincontanier">
          <div className="sidebar">
            <ul>
              <Link to={"/alluser"}>
                <li>
                  <FontAwesomeIcon id="icon" icon={faUser} />
                  <p>Users</p>
                </li>
              </Link>
              <Link to={"/allparticipent"}>
                <li>
                  <FontAwesomeIcon id="icon" icon={faRankingStar} />
                  <p>Event Registrations</p>
                </li>
              </Link>
              <Link to={"/subadmin"}>
                <li>
                  <FontAwesomeIcon id="icon" icon={faUserTie} />
                  <p>Sub Admins</p>
                </li>
              </Link>
              <Link to={"/allupdate"}>
                <li>
                  <FontAwesomeIcon id="icon" icon={faPenToSquare} />
                  <p>All Updations</p>
                </li>
              </Link>
              <Link to={"/time"}>
                <li>
                  <FontAwesomeIcon id="icon" icon={faCalendar} />
                  <p>Calender</p>
                </li>
              </Link>
              <Link to={"/admin"}>
                <li>
                  <FontAwesomeIcon id="icon" icon={faUserTie} />
                  <p>Add Sub Admin</p>
                </li>
              </Link>
            </ul>
          </div>
          <div className="details">
            <h2>Dashboard</h2>

            <div className="graph">
              <div className="Bars">
                <p>Details</p>
                <div className="all">
                  <div className="box">
                    <div className="bars">
                      <div className="bar">
                        <div className="value">{regularUsersCount}</div>
                        <div id="allusers" className="height"></div>
                      </div>
                    </div>
                    <div className="bars">
                      <div className="bar">
                        <div className="value">{subadminsCount}</div>
                        <div id="subadmins" className="height"></div>
                      </div>
                    </div>
                    <div className="bars">
                      <div className="bar">
                        <div className="value">{totalEventsCount}</div>
                        <div id="allevents" className="height"></div>
                      </div>
                    </div>
                  </div>
                  <div className="colorvalue">
                    <div className="elem">
                      <div className="color"></div>
                      <div className="text">Total Students</div>
                    </div>
                    <div className="elem">
                      <div
                        className="color"
                        style={{ background: "purple" }}
                      ></div>
                      <div className="text">Total Sub Admins</div>
                    </div>
                    <div className="elem">
                      <div
                        className="color"
                        style={{ background: "blue" }}
                      ></div>
                      <div className="text">Total Events</div>
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
