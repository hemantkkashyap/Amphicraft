import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./Event.css";
import { Link } from "react-router-dom";
import {
  setEventinputs,
  setEventprice,
} from "../../../Reduxstore/reducers/action";

export default function EventDetail() {
  const dispatch = useDispatch();
  const eventname = useSelector((state) => state.auth.eventName);
  const price = useSelector((state) => state.auth.price);
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch("https://amphicraft-api.vercel.app/api/auth/details", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ eventname }),
        });
        if (response.ok) {
          const eventData = await response.json();
          setEventDetails(eventData);
        } else if (response.status === 404) {
          alert("Event not found");
        } else {
          console.error("Failed to fetch event details");
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [eventname]);
  console.log(eventname);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleButtonClick = (maxparticipent, price) => {
    dispatch(setEventinputs(maxparticipent));
    dispatch(setEventprice(price));
  };

  const theme = useSelector((state) => state.auth.newTheme);

  return (
    <>
      <div className={`Main ${theme}`}>
        <div className="eventdetails1"></div>
        <div className="eventdetail1">
          <div className="details">
            <h1>{eventname}</h1>
            {eventDetails && (
              <>
                <span>
                  <span className="points">Details</span>
                  <p>:&nbsp;&nbsp;&nbsp;{eventDetails.eventdetail}</p>
                </span>

                <span>
                  <span className="points">Coordinator 1</span>
                  <p>:&nbsp;&nbsp;&nbsp;{eventDetails.coordinator1}</p>
                </span>

                <span>
                  <span className="points">Coordinator 2</span>
                  <p>:&nbsp;&nbsp;&nbsp;{eventDetails.coordinator2}</p>
                </span>

                <span>
                  <span className="points">Category</span>
                  <p>:&nbsp;&nbsp;&nbsp;{eventDetails.category}</p>
                </span>

                <span>
                  <span className="points">Venue</span>
                  <p>:&nbsp;&nbsp;&nbsp;{eventDetails.venue}</p>
                </span>

                <span>
                  <span className="points">Timing</span>
                  <p>:&nbsp;&nbsp;&nbsp;{eventDetails.timing}</p>
                </span>

                <span>
                  <span className="points">Available Entries</span>
                  <p>:&nbsp;&nbsp;&nbsp;{eventDetails.entries}</p>
                </span>

                <span>
                  <span className="points">Date</span>
                  <p>:&nbsp;&nbsp;&nbsp;{formatDate(eventDetails.date)}</p>
                </span>

                <span>
                  <span className="points">Max Participants</span>
                  <p>:&nbsp;&nbsp;&nbsp;{eventDetails.maxparticipent}</p>
                </span>

                <Link to={"/form"}>
                  <button
                    onClick={() =>
                      handleButtonClick(
                        eventDetails.maxparticipent,
                        eventDetails.price
                      )
                    }
                  >
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
