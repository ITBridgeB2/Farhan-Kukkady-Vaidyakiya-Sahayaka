import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]); // State to store fetched users
  const navigate = useNavigate(); // For navigation to view individual user's details

  useEffect(() => {
    // Fetch users when component mounts
    axios
      .get("http://localhost:8080/clone2") // Backend endpoint to fetch all users
      .then((response) => {
        setUsers(response.data); // Set users state to fetched data
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
      });
  }, []); // Empty dependency array to run only once on mount

  const handleViewUser = (id) => {
    // Navigate to the individual user details page (you can create a route to view user by ID)
    navigate(`/admin/user/${id}`); // ✅ Matches the route defined in App.js

  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">All Users</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient Name</th>
            <th>Phone Number</th>
            <th>Date of Birth</th>
            <th>Disease</th>
            <th>Hospital</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.patient_name}</td>
                <td>{user.phone_number}</td>
                <td>{user.date_of_birth}</td>
                <td>{user.disease}</td>
                <td>{user.hospital}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => handleViewUser(user.id)} // Call handleViewUser when clicked
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
