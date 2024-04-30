import React, { useState, useEffect } from "react";
import axios from "axios";

function Subadmin() {
  const [subAdmins, setSubAdmins] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubAdmins = async () => {
      try {
        const response = await axios.get(
          "https://amphicraft-api.vercel.app/api/auth/subadmin"
        );
        setSubAdmins(response.data);
      } catch (error) {
        setError("Failed to fetch subadmins. Please try again.");
      }
    };

    fetchSubAdmins();
  }, []);

  return (
    <div className="subadmincontanier">
      {error && <div className="error-message">{error}</div>}
      <h2>SubAdmin List</h2>
      <table className="subadmin-table">
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>IDs</th>
            <th>Branch</th>
            <th>College</th>
            <th>Email</th>
            <th>Contact No</th>
          </tr>
        </thead>
        <tbody>
          {subAdmins.map((subAdmin, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
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

export default Subadmin;
