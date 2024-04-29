import React, { useState, useEffect } from "react";
import axios from "axios";

function Allupdation() {
  const [updations, setUpdations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubAdmins = async () => {
      try {
        const response = await axios.get(
          "https://amphicraft-api.vercel.app/api/auth/getupdate"
        );
        setUpdations(response.data);
      } catch (error) {
        setError("Failed to fetch subadmins. Please try again.");
      }
    };

    fetchSubAdmins();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", { hour12: true });
  };

  return (
    <div className="subadmincontanier">
      {error && <div className="error-message">{error}</div>}
      <h2>All Updation List</h2>
      <table className="subadmin-table">
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>Email</th>
            <th>Event Name</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {updations.map((updation, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{updation.name}</td>
              <td>{updation.useremail}</td>
              <td>{updation.eventname}</td>
              <td>{formatDate(updation.date)}</td>
              <td>{formatTime(updation.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Allupdation;
