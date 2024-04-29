import React, { useState, useEffect } from "react";
import axios from "axios";

function AllRegister() {
  const [details, setdetails] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchdetails = async () => {
      try {
        const response = await axios.get(
          "https://amphicraft.vercel.app/api/auth/allregister"
        );
        setdetails(response.data);
      } catch (error) {
        setError("Failed to fetch details. Please try again.");
      }
    };

    fetchdetails();
  }, []);

  return (
    <div className="subadmincontanier">
      <img src="images/bgimage.svg" alt="" />
      {error && <div className="error-message">{error}</div>}
      <h2>SubAdmin List</h2>
      <table className="subadmin-table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Category</th>
            <th>Email</th>
            <th>Contact No</th>
          </tr>
        </thead>
        <tbody>
          {details.map((subAdmin, index) => (
            <tr key={index}>
              <td>{subAdmin.name}</td>
              <td>{subAdmin.enrollment}</td>
              <td>{subAdmin.branch}</td>
              <td>{subAdmin.college}</td>
              <td>{subAdmin.email}</td>
              <td>{subAdmin.contactno}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllRegister;
