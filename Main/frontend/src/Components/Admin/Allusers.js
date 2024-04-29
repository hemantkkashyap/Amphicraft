import React, { useState, useEffect } from "react";
import axios from "axios";

function Allusers() {
  const [regularUsers, setRegularUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRegularUsers = async () => {
      try {
        const response = await axios.get(
          "https://amphicraft.vercel.app/api/auth/getalluser"
        );
        const filteredUsers = response.data.filter(
          (user) => !user.isAdmin && !user.isSubAdmin
        );
        setRegularUsers(filteredUsers);
      } catch (error) {
        setError("Failed to fetch subadmins. Please try again.");
      }
    };

    fetchRegularUsers();
  }, []);

  return (
    <div className="subadmincontanier">
      {error && <div className="error-message">{error}</div>}
      <h2>All User List</h2>
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
          {regularUsers.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.enrollment}</td>
              <td>{user.branch}</td>
              <td>{user.college}</td>
              <td>{user.email}</td>
              <td>{user.contactno}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Allusers;
