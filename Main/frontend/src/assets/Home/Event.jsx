import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({
  offset: 0,
  duration: 1000,
});

const categoryColors = {
  Indoor: "#C9B5D8",
  Outdoor: "#F6CADC",
  Tech: "#C4DFFB",
  Cultural: "#ACD1FB",
};

const buttonColors = {
  Indoor: "#ffabab",
  Outdoor: "blue",
  Tech: "purple",
  Cultural: "green",
};

const categories = ["All", "Indoor", "Outdoor", "Tech", "Cultural"];

export default function Event() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filterCategory, setFilterCategory] = useState("");
  const [originalEvents, setOriginalEvents] = useState([]);
  const [events, setEvents] = useState([]);

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
      const response = await fetch("https://amphicraft-api.vercel.app/api/auth/events");
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
    if (filterCategory && filterCategory !== "All") {
      const filteredEvents = originalEvents.filter(
        (event) => event.category === filterCategory
      );
      setEvents(filteredEvents);
    } else {
      setEvents(originalEvents);
    }
  };

  return (
    <>
      <Navbar />
      <section className="w-full h-[100vh] mt-20 p-5">
        <div className="w-full h-auto p-5">
        {categories.map((category) => (
            <button
              key={category}
              className={`border border-black p-2 rounded-lg m-2 ${
                filterCategory === category ? "bg-gray-300" : ""
              }`}
              onClick={() => setFilterCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-10 justify-center w-full h-auto p-5">
  {events.map((event, index) => (
            <Link
              to={`/register`}
              state={{ event }}
              key={index}
            >
              <div
                className="flex flex-col items-center justify-center w-[300px] h-[300px] bg-white rounded-lg text-white" 
                style={{
                  backgroundColor:categoryColors[event.category],
                }}
                >

<div className="flex justify-center items-center text-3xl w-full h-[45%]">

                  <p className="w-[100px] h-[100px] rounded-full bg-white opacity-50 flex items-center justify-center text-black">10</p>
                </div>
                <div className="flex flex-col items-center w-full h-[55%]">
                  <div className="text-center w-full">
                    <p className="capitalize text-xl">{event.eventname}</p>
                  </div>
                  <p className="w-full h-[40%] text-center p-3">{event.eventdetail}</p>

                  <button
                    className="w-[80%] h-[50px] rounded-lg"
                    style={{
                      backgroundColor: buttonColors[event.category],
                    }}
                  >
                    Register
                  </button>
                </div>
              </div>
            </Link>
          ))}
        
        </div>
      </section>
    </>
  );
}
