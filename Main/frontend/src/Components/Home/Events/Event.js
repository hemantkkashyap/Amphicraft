import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCategory } from "../../../Reduxstore/CategoryContext";
import "./Event.css";
import { Link } from "react-router-dom";
import { setEventName } from "../../../Reduxstore/reducers/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({
  offset: 0,
  duration: 1000,
});
export default function Event() {
  const theme = useSelector((state) => state.auth.newTheme);
  const { category } = useCategory();
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [events, setEvents] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [originalEvents, setOriginalEvents] = useState([]);
  const [editMode, setEditMode] = useState({});
  const [editedEntries, setEditedEntries] = useState({});
  const isSubAdmin = useSelector((state) => state.auth.isSubAdmin);
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const originalText = "SEE ALL EVENTS HERE !!";

  useEffect(() => {
    const timer = setTimeout(() => {
      if (index < originalText.length) {
        setText((prevText) => prevText + originalText[index]);
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        setText("");
        setIndex(0);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [index]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    fetchEvents();
  }, []);

  useEffect(() => {
    // Filter events based on selected category
    filterEvents();
  }, [filterCategory, originalEvents]);

  const fetchEvents = async () => {
    try {
      const response = await fetch("https://amphicraft.vercel.app/api/auth/events");
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const eventData = await response.json();
      setEvents(eventData);
      setOriginalEvents(eventData);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const filterEvents = () => {
    if (filterCategory) {
      // If a category is selected, filter events based on the category
      const filteredEvents = originalEvents.filter(
        (event) => event.category === filterCategory
      );
      setEvents(filteredEvents);
    } else {
      // If no category is selected, reset events to original events data
      setEvents(originalEvents);
    }
  };

  useEffect(() => {
    setFilterCategory(category);
  }, [category]);

  const handleRegisterClick = (event) => {
    console.log("clicked");
    if (event.entries === 0) {
      alert("Sorry, no available entries for this event.");
    } else {
      dispatch(setEventName(event.eventname));
    }
  };

  const toggleEditMode = (index) => {
    setEditMode((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Toggle edit mode for the specific event
    }));
  };

  const handleEntriesChange = (event, index) => {
    setEditedEntries((prevState) => ({
      ...prevState,
      [index]: event.target.value, // Update the edited entries value
    }));
  };

  const saveEditedEntries = async (index) => {
    const editedEntry = editedEntries[index];
    const eventname = events[index].eventname;
    const name = localStorage.getItem("name");
    const useremail = localStorage.getItem("useremail");

    console.log(useremail);
    try {
      const response = await fetch(
        "https://amphicraft.vercel.app/api/auth/updateentry",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventname,
            entries: editedEntry,
            name,
            useremail,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update entry");
      }

      window.location.reload();

      toggleEditMode(index);
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  };

  const cubeStyle = {
    "--x": -1,
    "--y": 0,
  };

  return (
    <>
      <div className={`Main ${theme}`}>
        <div className="eventheading" data-aos="fade-right">
          <div class="container">
            <div class="cube">
              <div style={cubeStyle}>
                <span style={{ "--i": 3 }}></span>
                <span style={{ "--i": 2 }}></span>
                <span style={{ "--i": 1 }}></span>
              </div>
              <div style={{ "--x": 0, "--y": 0 }}>
                <span style={{ "--i": 3 }}></span>
                <span style={{ "--i": 2 }}></span>
                <span style={{ "--i": 1 }}></span>
              </div>
              <div style={{ "--x": 1, "--y": 0 }}>
                <span style={{ "--i": 3 }}></span>
                <span style={{ "--i": 2 }}></span>
                <span style={{ "--i": 1 }}></span>
              </div>
            </div>
            <div class="cube">
              <div style={cubeStyle}>
                <span style={{ "--i": 3 }}></span>
                <span style={{ "--i": 2 }}></span>
                <span style={{ "--i": 1 }}></span>
              </div>
              <div style={{ "--x": 0, "--y": 0 }}>
                <span style={{ "--i": 3 }}></span>
                <span style={{ "--i": 2 }}></span>
                <span style={{ "--i": 1 }}></span>
              </div>
              <div style={{ "--x": 1, "--y": 0 }}>
                <span style={{ "--i": 3 }}></span>
                <span style={{ "--i": 2 }}></span>
                <span style={{ "--i": 1 }}></span>
              </div>
            </div>
            <div class="cube">
              <div style={cubeStyle}>
                <span style={{ "--i": 3 }}></span>
                <span style={{ "--i": 2 }}></span>
                <span style={{ "--i": 1 }}></span>
              </div>
              <div style={{ "--x": 0, "--y": 0 }}>
                <span style={{ "--i": 3 }}></span>
                <span style={{ "--i": 2 }}></span>
                <span style={{ "--i": 1 }}></span>
              </div>
              <div style={{ "--x": 1, "--y": 0 }}>
                <span style={{ "--i": 3 }}></span>
                <span style={{ "--i": 2 }}></span>
                <span style={{ "--i": 1 }}></span>
              </div>
            </div>
          </div>
          <h1>{text}</h1>
        </div>
        <div className="eventcontanier">
          <div className="allevents">
            {events.map((event, index) => (
              <div key={index} className="card" data-aos="fade-up">
                <div class="content">
                  <h3 class="heading">{event.eventname}</h3>
                  <p class="para">
                    Detail:&nbsp;&nbsp;&nbsp;{event.eventheading}
                  </p>
                  <p>
                    <strong>Available Entries:&nbsp;&nbsp;&nbsp;</strong>
                    {editMode[index] ? ( // Render input field if edit mode is active
                      <input
                        type="number"
                        value={
                          editedEntries[index] !== undefined
                            ? editedEntries[index]
                            : event.entries
                        }
                        onChange={(e) => handleEntriesChange(e, index)}
                        style={{
                          width: "100px",
                          paddingLeft: "5px",
                          outline: "2px solid black",
                        }} // Apply outline when in edit mode
                      />
                    ) : (
                      <span>{event.entries}</span>
                    )}
                  </p>
                  <p>Coordinator 1:&nbsp;&nbsp;&nbsp;{event.coordinator1}</p>
                  <p>Coordinator 2:&nbsp;&nbsp;&nbsp;{event.coordinator2}</p>
                  {isLoggedIn ? (
                    <>
                      {event.entries === 0 ? (
                        <p className="blink">Entries full for this event</p>
                      ) : (
                        <Link to={"/eventdetail"}>
                          <button
                            class="btn"
                            onClick={() => handleRegisterClick(event)}
                          >
                            Details
                          </button>
                        </Link>
                      )}
                      {isSubAdmin && (
                        <>
                          {editMode[index] ? (
                            <FontAwesomeIcon
                              icon={faCheck}
                              id="Saveevent"
                              onClick={() => saveEditedEntries(index)}
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              id="Editevent"
                              onClick={() => toggleEditMode(index)}
                            />
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <p>
                      Please log in to register for this event.{" "}
                      <Link to={"/login"}>Login</Link>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
