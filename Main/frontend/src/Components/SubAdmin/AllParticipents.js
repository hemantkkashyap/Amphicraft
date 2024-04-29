import React, { useState, useEffect } from "react";
import "./Subadmin.css";

export default function AllParticipants() {
  const [participantsData, setParticipantsData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState("All");

  const fetchParticipantData = async () => {
    try {
      const response = await fetch(
        "https://amphicraft-api.vercel.app/api/auth/getallparticpent"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch participant data");
      }
      const data = await response.json();
      setParticipantsData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchParticipantData();
  }, []);

  const handleChange = (event) => {
    setSelectedEvent(event.target.value);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Filter event names based on status "success"
  const filteredEventNames = Array.from(
    new Set(
      participantsData
        .filter((event) => event.status === "success")
        .map((event) => event.eventName)
    )
  );

  // Filter participants based on selected event name and status
  let filteredParticipants = participantsData;
  if (selectedEvent !== "All") {
    filteredParticipants = participantsData.filter(
      (event) => event.eventName === selectedEvent
    );
  }
  filteredParticipants = filteredParticipants.filter(
    (event) => event.status === "success"
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="subadmincontanier">
      <h1>All Participants</h1>
      <span className="filter">
        <label htmlFor="eventFilter">Filter by Event Name: </label>
        <select id="eventFilter" value={selectedEvent} onChange={handleChange}>
          <option value="All">All</option>
          {/* Populate dropdown menu with unique event names */}
          {filteredEventNames.map((eventName, index) => (
            <option key={index} value={eventName}>
              {eventName}
            </option>
          ))}
        </select>
        <button onClick={handlePrint}>Print List</button>
      </span>

      <div id="printableTable">
        <table className="participants-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Event Name</th>
              <th>Name</th>
              <th>Email</th>
              <th>Branch</th>
              <th>Semester</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {filteredParticipants.map((event, index) =>
              event.participants.map(
                (participant, participantIndex) =>
                  // Check if name, email, and contact are not empty
                  participant.name &&
                  participant.email &&
                  participant.contact && (
                    <tr key={participantIndex}>
                      <td>{index + 1}</td>
                      <td>{event.eventName}</td>
                      <td>{participant.name}</td>
                      <td>{participant.email}</td>
                      <td>{participant.branch}</td>
                      <td>{participant.sem}</td>
                      <td>{participant.contact}</td>
                    </tr>
                  )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
